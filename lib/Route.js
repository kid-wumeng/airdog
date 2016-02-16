import Path from 'path'
import Middleware from './Middleware'



/**
* @param! { String } path
* @param! { Function | Async-Function } fn - the middleware function
*/
function Route(path, fn)
{
  this.path = path  // String
  this.fn = fn      // Function | Async-Function
  
  // RegExp
  this.regexp = Route.parseRegExp(this.path)
}



/**
* @param { String } path
*/
Route.parseRegExp = function(path)
{
  if(path === '*'){
    return /^(?:.+)$/
  }
  
  const OLD_PARAM = /:\S+?(?=\/)/g
  const NEW_PARAM = '([^\/]+?)'
  const OLD_STAR  = /\*/g
  const NEW_STAR  = '(?:.+)'
  
  let regexp = Path.normalize(`/${path}/`)
    .replace(OLD_PARAM, NEW_PARAM)  // parse all :param
    .replace(OLD_STAR, NEW_STAR)    // parse all *
    
  return new RegExp(`^${regexp}$`)
}



/**
* @param  { String } path - should includes the end-slash, e.q `/user/`
* @return { Middleware | null } mid
*/
Route.prototype.match = function( path )
{
  let result = path.match(this.regexp)
  if( !result ) {
    return null
  }
  
  let params = result.slice(1)
  return params.length > 0 ?
    new Middleware(this.fn, params)
  : new Middleware(this.fn)
}



module.exports = Route