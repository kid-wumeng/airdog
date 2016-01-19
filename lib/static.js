let Path = require('path')
let Process = require('process')

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



// @TODO - More types
let TypeTable = {
  "css": "text/css",
  "gif": "image/gif",
  "html": "text/html",
  "ico": "image/x-icon",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "js": "text/javascript",
  "json": "application/json",
  "pdf": "application/pdf",
  "png": "image/png",
  "svg": "image/svg+xml",
  "swf": "application/x-shockwave-flash",
  "tiff": "image/tiff",
  "txt": "text/plain",
  "wav": "audio/x-wav",
  "wma": "audio/x-ms-wma",
  "wmv": "video/x-ms-wmv",
  "xml": "text/xml"
}



/**
 * Create a middleware to handle the static-path.
 */
exports.middleware = async function()
{
  let localPath, data, ext, type
  localPath = Path.normalize(CWD + this.path)
  
  
  let cache = await useCache.call(this, localPath)
  if(!cache){
    return
  }

  
  data = await this.read(localPath)
  if(data !== null)
  {
    ext = Path.extname(localPath)
    if(ext){
      ext = ext.slice(1)
      type = TypeTable[ext]
    }
  }
  this.type = type || 'text/plain'
  this.body = data
}


async function useCache( localPath )
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
async function getTime( localPath )
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