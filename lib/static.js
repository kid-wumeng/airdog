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
  let path, data, ext, type
  path = Path.normalize(CWD + this.path)
  data = await this.read(path)
  if(data !== null)
  {
    ext = Path.extname(path)
    if(ext){
      ext = ext.slice(1)
      type = TypeTable[ext]
    }
  }
  this.type = type || 'text/plain'
  this.body = data
}