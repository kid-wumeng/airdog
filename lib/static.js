let Path = require('path')
let Process = require('process')
let FS = require('fs')
let Zlib = require('zlib')
let CONFIG = require('./CONFIG')

const CWD = Process.cwd()


/**
 * Is the path a static-path ?
 * @param  { String } path
 * @param  { Array < String > } static - from the `app.config.static`
 * @return { boolean }
 */
exports.check = function( path, statics )
{
  let regexp
  return statics.some(function(s){
    s = Path.normalize(`/${s}`)
    regexp = new RegExp(`^${s}`)
    return regexp.test( path )
  })
}


/**
 * The middleware to handle the static-path.
 */
exports.middleware = async function()
{
  let localPath, data, ext, type, isContinue
  localPath = Path.normalize(CWD + this.path)
  
  let exist = await this.fs.exists(localPath)
  if( !exist ) return
  
  ext = Path.extname(localPath).slice(1)
  
  isContinue = await useCache.call(this, localPath)
  if( !isContinue ) return

  isContinue = await useEncoding.call(this, localPath, ext)
  if( !isContinue ) return
  
  this.body = await this.read(localPath)
  if(this.body !== null){
    this.type = CONFIG['content-type'][ext]
  }
}



/**
* @param { String } localPath
* @return { boolean } - is continue the static middleware ?
*/
async function useCache(localPath)
{
  let time = await getTime.call(this, localPath)
  if(shouldFlush(time)){
    this.set('Last-Modified', time.server)
    return true
  } else {
    this.status = 304
    this.body = ''
    return false
  }
}



/**
* Get client-time and server-time of resource
* @param  { String } localPath
* @return { Object } time - { client: Date|null, server: Date }
*/
async function getTime(localPath)
{
  let stats = await this.fs.stat( localPath )
  let since = this.get('If-Modified-Since')
  return {
    client: since ? new Date(since) : null,
    server: stats.mtime
  }
}



/**
* Is the resource need to update ?
* @param  { Object } time - { client: Date|null, server: Date }
* @return { boolean }
*/
function shouldFlush(time){
  return time.client === null || time.client < time.server
}



/**
* @param  { String } localPath
* @param  { String } ext
* @return { boolean } - is continue the static middleware ?
*/
function useEncoding(localPath, ext){
  if(shouldEncoding(ext)){
    // @TODO change to this.fs.createReadStream
    let encoding = selectEncoding.call(this)
    if( encoding ){
      this.type = CONFIG['content-type'][ext]
      this.set('Content-Encoding', encoding.name)
      this.body = FS.createReadStream(localPath).pipe(encoding.pipe)
      return false
    }
  }
  return true
}



/**
* @param { String } ext - html, txt, png, ...
* @return { boolean }
*/
function shouldEncoding(ext){
  return CONFIG['should-encoding'].includes(ext)
}



/**
* @this   { Context }
* @return { Object | null } encoding - { name: String, pipe: Gzip | Deflate }
*/
function selectEncoding(){
  let accept = this.get('Accept-Encoding')
  switch(true){
    case accept.includes('gzip'):    return { name: 'gzip',    pipe: Zlib.createGzip() }
    case accept.includes('deflate'): return { name: 'deflate', pipe: Zlib.createDeflate() }
  }
  return null
}