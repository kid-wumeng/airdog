import http from 'http'
import route from './route'
import middleware from './middleware'
import Context from './Context'


class Application {
  
  constructor(){
    this.routeTable = {
      'GET':    [],
      'POST':   [],
      'PUT':    [],
      'DELETE': [],
    }
  }
  
  
  
  get( path, mid ){
    this.add( 'GET', path, mid )
  }
  post( path, mid ){
    this.add( 'POST', path, mid )
  }
  put( path, mid ){
    this.add( 'PUT', path, mid )
  }
  del( path, mid ){
    this.add( 'DELETE', path, mid )
  }
  
  
  
  add( verb, path, mid ){
    this.routeTable[verb].push({
      path: path,
      middleware: mid
    })
  }
  
  
  
  callback( req, res ){
    // Create context for `this` in middleware
    let ctx = new Context(req, res)

    // Search all matched middlewares
    let path = req.url
    let routes = this.routeTable[req.method]
    let mids = route.Search( path, routes )
    
    // Add a middleware in the end to send response
    mids.push({ fn: this.send })
    
    middleware.Call( mids, ctx )
  }
  
  
  
  listen( port ){
    // Transform the route.path to route.regexp
    for( let verb in this.routeTable ){
      let routes = this.routeTable[verb]
      route.TransformAll( routes )
    }
    
    let callback = this.callback.bind( this )
    http.createServer( callback ).listen( port )
  }
  
  
  
  send(){
    let body = this.body
    let res = this.raw.res
    
    if( body === undefined || body === null ){
      res.writeHead(404)
      return res.end()
    }
    
    if( typeof body === 'object' ){
      body = JSON.stringify( body )
    }
    res.writeHead( 200, {
      'Content-Type': 'text/plain',
      'Content-Length': body.length
    })
    res.end( body )
  }
}

module.exports = Application