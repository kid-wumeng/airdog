import FS from 'fs'
import Stream from 'stream'
import Path from 'path'
import ZLib from 'zlib'
import Process from 'process';



const ZIP_TYPES = ['html', 'css', 'js']
const MIME = {}
MIME['css']  = "text/css",
MIME['gif']  = "image/gif",
MIME['html'] = "text/html",
MIME['ico']  = "image/x-icon",
MIME['jpeg'] = "image/jpeg",
MIME['jpg']  = "image/jpeg",
MIME['js']   = "text/javascript",
MIME['json'] = "application/json",
MIME['pdf']  = "application/pdf",
MIME['png']  = "image/png",
MIME['svg']  = "image/svg+xml",
MIME['swf']  = "application/x-shockwave-flash",
MIME['tiff'] = "image/tiff",
MIME['txt']  = "text/plain",
MIME['wav']  = "audio/x-wav",
MIME['wma']  = "audio/x-ms-wma",
MIME['wmv']  = "video/x-ms-wmv",
MIME['xml']  = "text/xml"



module.exports = async function(){
  await this.next
  
  if(!this.app.static){ return }
  
  // Is the dynamic-route has matched ?
  if(this.body !== null){ return }

  // Is the local is exist ( and is file not dir ) ?
  let local = await find.call(this)
  if(!local){ return }
  
  // Is send 304 to express the `Not Modified` ?
  cache.call(this, local)
  if(this.status === 304){ return }

  // set Content-Type
  let type = Path.extname(local).slice(1)
  this.type = MIME[type] ? MIME[type] : 'text/plain'
  
  // Is use the `gzip` or `deflate`
  zip.call(this, local, type)
  if(this.body instanceof Stream.Readable){ return }

  // Send local-file data
  this.body = await this.read(local)
}



/**
* Find local file path
* @return { String | null }
*/
async function find(){
  let bases = this.app.static
  let base, local, exist
  let len = bases.length

  for( let i = 0; i < len; i++ ){
    base = bases[i]
    local = combine.call(this, base)
    exist = await this.isFile(local)
    if(exist)
      return local
  }
  return null
}



/**
* @param  { String } base path ( from this.static )
* @return { String } local file path
*/
function combine(base){
  return Path.normalize(`${base}/${this.path}`)
}



async function cache(local){
  let time = await getTime.call(this, local)
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
* @param  { String } local
* @return { Object } time - { client: Date|null, server: Date }
*/
async function getTime(local){
  let stats = await this.fs.stat(local)
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
* @param  { String } local
* @param  { String } type
* @return { boolean } - is continue the static middleware ?
*/
function zip(local, type){
  if(shouldZip(type)){
    let encoding = getEncoding.call(this)
    if( encoding ){
      this.set('Content-Encoding', encoding.name)
      this.body = FS.createReadStream(local).pipe(encoding.pipe)
    }
  }
}



/**
* @param  { String } type - html, txt, png, ...
* @return { boolean }
*/
function shouldZip(type){
  return ZIP_TYPES.includes(type)
}



/**
* @return { Object | null } encoding - { name: String, pipe: Gzip | Deflate }
*/
function getEncoding(){
  let accept = this.get('Accept-Encoding')
  if(!accept){
    return null
  }
  switch(true){
    case accept.includes('gzip'):    return { name: 'gzip',    pipe: ZLib.createGzip() }
    case accept.includes('deflate'): return { name: 'deflate', pipe: ZLib.createDeflate() }
  }
  return null
}