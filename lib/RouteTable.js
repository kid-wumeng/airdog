"use strict"
const Path = require('path')
const MiddlewareQueue = require('./MiddlewareQueue')
const Kit = require('./Kit')



function RouteTable()
{
  this.GET     = []
  this.POST    = []
  this.PUT     = []
  this.DELETE  = []
  this.OPTIONS = []
}



RouteTable.ALL     = 'ALL'
RouteTable.GET     = 'GET'
RouteTable.POST    = 'POST'
RouteTable.PUT     = 'PUT'
RouteTable.DELETE  = 'DELETE'
RouteTable.OPTIONS = 'OPTIONS'



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
    this.OPTIONS.push(route)
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
  path = Kit.formatPath(`/${path}/`)
  let mid
  let midQue = new MiddlewareQueue
  this[method].forEach(function(route){
    mid = route.match(path)
    if(mid)
      midQue.add(mid)
  })
  return midQue
}



module.exports = RouteTable