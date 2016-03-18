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
  
  this.server = null
  this.port = null
  this.routeTable = new RouteTable
  this.cursor = { method: null, path: null }
  
  this.event = {}
  
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
    .use( Airdog.Render )
}



Server.prototype.all = function(path, mid, config){
  return this.add(RouteTable.ALL, path, mid)
}



Server.prototype.get = function(path, mid, config){
  return this.add(RouteTable.GET, path, mid, config)
}



Server.prototype.post = function(path, mid, config){
  return this.add(RouteTable.POST, path, mid)
}



Server.prototype.put = function(path, mid, config){
  return this.add(RouteTable.PUT, path, mid)
}



Server.prototype.del = function(path, mid, config){
  return this.add(RouteTable.DELETE, path, mid)
}



Server.prototype.add = function(method, path, mid, config){
  this.cursor.method = method
  this.cursor.path = this.getCompletePath(path)
  if(mid)
    this.use(mid, config)
  return this
}



Server.prototype.getCompletePath = function(path){
  switch(path){
    case '*':
    case '/': return path
    default:  return Path.normalize(`/${this.base}/${path}/`)
  }
}



Server.prototype.use = function(mid, config)
{
  mid = new Middleware(mid, config)
  this.bindEvent(mid)
  
  let path = this.cursor.path
  let method = this.cursor.method
  let route = new Route(path, mid)
  this.routeTable.add(method, route)
  
  return this
}



Server.prototype.bindEvent = function(mid){
  let name, callback
  for(name in mid.event){
    if(!mid.event[name]){
      continue
    }
    if(!this.event[name]){
      this.event[name] = []
    }
    callback = mid.event[name]
    this.event[name].push(callback)
  }
}



Server.prototype.fireEvent = function(name){
  let events = this.event[name]
  let app = this
  events.forEach(function(callback){
    callback.call({ app: app })
  })
}



Server.prototype.listen = async function(port)
{
  let callback = this.callback.bind(this)
  // @TODO Support HTTPS Server
  this.server = HTTP.createServer(callback)
  this.port = port
  this.fireEvent('appCreate')
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
  this.fireEvent('appClose')
  this.server.close(callback)
}



module.exports = Server