import HTTP from 'http'
import Path from 'path'
import Airdog from './Airdog'
import Route from './Route'
import RouteTable from './RouteTable'
import Context from './Context'



function Server(config){
  // default config
  this.base = ''
  
  
  
  this.server = null
  this.routeTable = new RouteTable
  this.cursor = { method: null, path: null }
  
  // @TODO support *
  this.all('*')
    .use(Airdog.Send)
}



Server.prototype.all = function(path, fn){
  return this.add(RouteTable.ALL, path, fn)
}



Server.prototype.get = function(path, fn){
  return this.add(RouteTable.GET, path, fn)
}



Server.prototype.post = function(path, fn){
  return this.add(RouteTable.POST, path, fn)
}



Server.prototype.put = function(path, fn){
  return this.add(RouteTable.PUT, path, fn)
}



Server.prototype.del = function(path, fn){
  return this.add(RouteTable.DELETE, path, fn)
}



Server.prototype.add = function(method, path, fn){
  this.cursor.method = method
  this.cursor.path = `${this.base}/${path}`
  if(fn)
    this.use(fn)
  return this
}



Server.prototype.use = function(fn){
  let method = this.cursor.method
  let route = new Route(this.cursor.path, fn)
  this.routeTable.add(method, route)
  return this
}



Server.prototype.listen = function(port){
  let callback = this.callback.bind(this)
  this.server = HTTP.createServer(callback)
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