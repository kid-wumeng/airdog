"use strict"
const HTTP = require('http')
const HTTPS = require('https')
const Path = require('path')
const Airdog = require('./Airdog')
const Middleware = require('./Middleware')
const Route = require('./Route')
const RouteTable = require('./RouteTable')
const Context = require('./Context')
const AsyncAwaitFS = require('./AsyncAwaitFS')
const Kit = require('./Kit')



function Server(config){
  // default config
  this.base = ''
  this.static = null
  // this.https = false
  // this.key = ''
  // this.cert = ''
  
  Kit.merge(this, config)
  this.formatConfig()
  
  this.server = null
  this.port = null
  this.routeTable = new RouteTable
  this.cursor = { method: null, path: null }
  
  this.event = {}
  this.event.appCreate = []
  
  this.all('*')
    .use( Airdog.Core )
    .use( Airdog.Send )
    .use( Airdog.FS )
    .use( Airdog.Static )
    .use( Airdog.Cookie )
    .use( Airdog.Session )
    .use( Airdog.BodyParser.Form )
    .use( Airdog.BodyParser.JSON )
    .use( Airdog.BodyParser.File )
}



Server.prototype.formatConfig = function(){
  this.formatStatic()
}



Server.prototype.formatStatic = function(){
  // e.g, this.static = 'public' => ['public']
  if(typeof this.static === 'string'){
    this.static = [ this.static ]
  }
}



Server.prototype.all = function(path, mid){
  return this.add(RouteTable.ALL, path, mid)
}



Server.prototype.get = function(path, mid){
  return this.add(RouteTable.GET, path, mid)
}



Server.prototype.post = function(path, mid){
  return this.add(RouteTable.POST, path, mid)
}



Server.prototype.put = function(path, mid){
  return this.add(RouteTable.PUT, path, mid)
}



Server.prototype.del = function(path, mid){
  return this.add(RouteTable.DELETE, path, mid)
}



Server.prototype.add = function(method, path, mid){
  this.cursor.method = method
  this.cursor.path = this.getCompletePath(path)
  if(mid)
    this.use(mid)
  return this
}



Server.prototype.getCompletePath = function(path){
  switch(path){
    case '*':
    case '/': return path
    default:  return Path.normalize(`/${this.base}/${path}/`)
  }
}



Server.prototype.use = function(mid)
{
  let route = new Route(this.cursor.path, new Middleware(mid))
  this.routeTable.add(this.cursor.method, route)
  return this
}



Server.prototype.listen = async function(port)
{
  let callback = this.callback.bind(this)
  // @TODO Support HTTPS Server
  this.server = HTTP.createServer(callback)
  this.port = port
  this.server.listen(port)
}



Server.prototype.callback = function(req, res){
  let data = ''
  req.on('data', function(chunk){
    data += chunk
  })
  req.on('end', function(){
    this.run({
      req: req,
      res: res,
      data: data
    })
  }.bind(this))
}



Server.prototype.run = function(raw){
  let method = raw.req.method
  let path   = raw.req.url.split('?')[0]
  
  let midQue = this.routeTable.match(method, path)
  let ctx = new Context(this, raw)
  
  midQue.run(ctx)
}



Server.prototype.close = function(callback){
  this.server.close(callback)
}



module.exports = Server