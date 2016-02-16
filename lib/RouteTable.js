import Path from 'path'
import MiddlewareQueue from './MiddlewareQueue'



function RouteTable()
{
  this.GET    = []
  this.POST   = []
  this.PUT    = []
  this.DELETE = []
}



RouteTable.ALL    = 'ALL'
RouteTable.GET    = 'GET'
RouteTable.POST   = 'POST'
RouteTable.PUT    = 'PUT'
RouteTable.DELETE = 'DELETE'



/**
* @param! { String } method
* @param! { Route }  route
*/
RouteTable.prototype.add = function(method, route){
  if( method === RouteTable.ALL ){
    this.GET.push(route)
    this.POST.push(route)
    this.PUT.push(route)
    this.DELETE.push(route)
  } else {
    this[method].push(route)
  }
}



/**
* @param  { String } path
* @return { MiddlewareQueue } midQue
*
*/
RouteTable.prototype.match = function(method, path)
{
  path = Path.normalize(`/${path}/`)
  let midQue = new MiddlewareQueue, mid
  this[method].forEach(function(route){
    mid = route.match(path)
    if(mid)
      midQue.add(mid)
  })
  return midQue
}



module.exports = RouteTable