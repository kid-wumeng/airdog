import http from 'http'
import Path from 'path'
import Stream from 'stream'
import route from './route'
import middleware from './middleware'
import Context from './Context'
import toolkit from './toolkit'
import Static from './static'


class Application {
  
  constructor(config)
  {
    // To merge the default-config and user-config
    this.config = toolkit.merge({
      static: []
    }, config)
    
    if( typeof this.config.static === 'string' ){
      this.config.static = [ this.config.static ]
    }
    
    this.routeTable = {
      'GET':    [],
      'POST':   [],
      'PUT':    [],
      'DELETE': [],
    }
    
    this.static = this.config.static
  }
  
  
  /**
   * @param { String } path
   * @param { async Function } mid
   */
   
  all( path, mid ){
    this.add( 'GET', path, mid )
    this.add( 'POST', path, mid )
    this.add( 'PUT', path, mid )
    this.add( 'DELETE', path, mid )
    return this
  }
  get( path, mid ){
    return this.add( 'GET', path, mid )
  }
  post( path, mid ){
    return this.add( 'POST', path, mid )
  }
  put( path, mid ){
    return this.add( 'PUT', path, mid )
  }
  del( path, mid ){
    return this.add( 'DELETE', path, mid )
  }
  
  
  
  /**
   * Add a middleware to routeTable base on the verb and path.
   *
   * @param { String } verb - 'GET' | 'POST' | 'PUT' | 'DELETE'
   * @param { String } path
   * @param { async Function } mid
   */
  
  add( verb, path, mid ){
    let routes = this.routeTable[verb]
    if(typeof mid === 'function'){
      routes.push({
        path: path,
        middleware: mid
      })
    }
    return this.createManager(routes, path)
  }
  
  
  
  createManager( routes, path ){
    function Manager(routes, path){
      this.routes = routes
      this.path = path
    }
    Manager.prototype.use = function(mid){
      this.routes.push({
        path: this.path,
        middleware: mid
      })
      return this
    }
    return new Manager(routes, path)
  }
  
  
  
  /**
   * @param { int } port - default 80
   */
   
  listen( port ){
    // Transform the route.path to route.regexp
    for( let verb in this.routeTable ){
      let routes = this.routeTable[verb]
      route.TransformAll( routes )
    }
    
    let callback = this.callback.bind( this )
    http.createServer( callback ).listen( port )
  }
  
  
  
  /**
   * For http.createServer( callback )
   *
   * @param { http.IncomingMessage } req
   * @param { http.ServerResponse }  res
   */
   
  callback( req, res ){
    let reqData = ''
    req.on('data', function(chunk){
      reqData += chunk
    })
    
    req.on('end', function(){
      this.call(req, res, reqData)
    }.bind(this))
  }
  
  
  
  /**
   * Ready and start to execute the middlewares
   *
   * Step 1. Create a context
   * Step 2. Search matched middlewares
   * Step 3. Call middlewares
   *
   * @param { http.IncomingMessage } req
   * @param { http.ServerResponse }  res
   * @param { String | Stream }      reqData
   */
   
  call( req, res, reqData ){
    // Create context for `this` in middleware
    let ctx = new Context(this, req, res, reqData)
    
    // Search all matched middlewares
    let path = req.url.split('?')[0]
    let mids = []
    let routes = this.routeTable[req.method]
    mids = route.Search( path, routes )
    mids.push({ fn: Static.middleware })
    mids.unshift({ fn: this.send })
    // now: [send, m1, m2, ..., static]
    middleware.Call( mids, ctx )
  }
  
  
  
  /**
   * As the last middleware be added to send the response.
   */
   
  async send(){

    await this.next

    let body = this.body
    
    
    if(body instanceof Stream.Readable){
      return body.pipe(this.raw.res)
    }
    
    body = formatBody(this.body)
    let res = this.raw.res
    
    if( body !== null ){
      // @TODO change to this.length
      res.writeHead(this.status, {
        'Content-Length': body.length
      })
      res.end(body)
    } else {
      res.writeHead(404)
      return res.end()
    }
  }
  
}


/**
 * @param  { * } body
 * @return { Buffer | String | null } body
 */
function formatBody( body ){
  switch(true){
    case body instanceof Buffer:   return body
    case typeof body === 'object': return JSON.stringify(body)
    case body === undefined:       return null
    case body === null:            return null
    default:                       return body.toString()
  }
}



module.exports = Application