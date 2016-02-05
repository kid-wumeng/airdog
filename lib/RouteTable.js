import Path from 'path'
import MiddlewareQueue from './MiddlewareQueue'



class RouteTable {
  constructor(){
    this.GET    = []
    this.POST   = []
    this.PUT    = []
    this.DELETE = []
  }
}



RouteTable.GET    = 'GET'
RouteTable.POST   = 'POST'
RouteTable.PUT    = 'PUT'
RouteTable.DELETE = 'DELETE'



/**
* @param! { String } method
* @param! { String } path
* @param! { Function | Async-Function } fn - the middleware function
*/
RouteTable.prototype.add = function(method, path, fn){
  this[method] = new Route(path, fn)
}



/**
* @param { String } path
*
*
*/
RouteTable.prototype.search = function( path ){
  
}



module.exports = RouteTable