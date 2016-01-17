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


/**
 * Create a middleware to handle the static-path.
 */
exports.middleware = async function()
{
  let path = Path.normalize(CWD + this.path)
  let res = await this.read( path )
  this.body = res
}