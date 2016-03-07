"use strict"


/**
* @param! { String } path - should includes the end-slash, e.q `/user/`
* @param! { Middleware } mid
*/
function Route(path, mid)
{
  this.path = path
  this.mid = mid
  this.regexp = this.parseRegExp()
}



/**
* @param { String } path
*/
Route.prototype.parseRegExp = function()
{
  if(this.path === '*')
    return /^(?:.+)$/
  
  const OLD_PARAM = /:\S+?(?=\/)/g
  const NEW_PARAM = '([^\/]+?)'
  const OLD_STAR  = /\*/g
  const NEW_STAR  = '(?:.+)'
  
  let regexp = this.path
    .replace(OLD_PARAM, NEW_PARAM)  // parse all :param
    .replace(OLD_STAR, NEW_STAR)    // parse all *
    
  return new RegExp(`^${regexp}$`)
}



/**
* @param  { String } path - should includes the end-slash, e.q `/user/`
* @return { Middleware | null } mid
*/
Route.prototype.match = function(path)
{
  let result = path.match(this.regexp)
  if(!result) {
    return null
  }
  
  let params = result.slice(1)
  if( params.length ){
    this.mid.params = params
  }
  return this.mid
}



module.exports = Route