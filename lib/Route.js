"use strict"
const Middleware = require('./Middleware')



/**
* @param! { String } path - should includes the end-slash, e.q `/user/`
* @param! { Function | Async-Function } fn - the middleware function
*/
function Route(path, fn)
{
  this.path = path
  this.fn = fn
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
  return params.length > 0 ?
    new Middleware(this.fn, params)
  : new Middleware(this.fn)
}



module.exports = Route