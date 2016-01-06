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
  
  
  /**
   * @param { String } path
   * @param { async Function } mid
   */
   
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
  
  
  
  /**
   * Add a middleware to routeTable base on the verb and path.
   *
   * @param { String } verb - 'GET' | 'POST' | 'PUT' | 'DELETE'
   * @param { String } path
   * @param { async Function } mid
   */
   
  add( verb, path, mid ){
    this.routeTable[verb].push({
      path: path,
      middleware: mid
    })
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
   * Step 1. Create a context
   * Step 2. Search matched middlewares
   * Step 3. Call middlewares
   *
   * @param { http.IncomingMessage } req
   * @param { http.ServerResponse }  res
   */
   
  callback( req, res ){
    // Create context for `this` in middleware
    let ctx = new Context(req, res)

    // Search all matched middlewares
    let path = req.url
    let routes = this.routeTable[req.method]
    let mids = route.Search( path, routes )
    
    // now: [send, m1, m2, ...]
    mids.unshift({ fn: this.send })
    
    middleware.Call( mids, ctx )
  }
  
  
  /**
   * As the last middleware be added to send the response.
   */
   
  async send(){
    await this.next
    
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