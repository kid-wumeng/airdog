class Request {
  
  
  constructor(req, res, reqData){
    this.raw = {}
    this.raw.req = req
    this.raw.res = res
    this.raw.reqData = reqData
    
    // The request query, for example:
    // http://kid-wumeng.me/index.html?from=abcd&islogin=true => { from: 'abcd', login: true }
    // http://kid-wumeng.me/index.html => {}
    this.query = _parseQuery(querystring)
  }
  

  
  /**
   * @return { String } verb - `GET` | `POST` | ...
   */
   
  get verb(){
    return this.method
  }
  
  
  
  /**
   * @return { String } method - `GET` | `POST` | ...
   */
   
  get method(){
    return this.raw.req.method
  }
  
  
  
  /**
   * Return request url, for example:
   *
   *   http://kid-wumeng.me/index.html?from=abcd
   *
   * @return { String } url
   */
   
  get url(){
    return `${this.protocol}://${this.host}${this.raw.req.url}`
  }
  
  
  
  /**
   * Return request protocol, for example:
   *
   *   http://kid-wumeng.me/index.html  => http
   *   https://kid-wumeng.me/index.html => https
   *
   * @return { String } protocol
   *
   * @TODO To support https
   */
   
  get protocol(){
    return 'http'
  }
  
  
  
  /**
   * Return request host, for example:
   *
   *   http://localhost/index.html          => localhost
   *   http://127.0.0.1/index.html          => 127.0.0.1
   *   http://kid-wumeng.me/index.html      => kid-wumeng.me
   *   http://kid-wumeng.me:8080/index.html => kid-wumeng.me:8080
   *
   * @return { String } host
   */
   
  get host(){
    return this.get('Host')
  }
  
  
  
  /**
   * Return request hostname, for example:
   *
   *   http://localhost/index.html          => localhost
   *   http://127.0.0.1/index.html          => 127.0.0.1
   *   http://kid-wumeng.me/index.html      => kid-wumeng.me
   *   http://kid-wumeng.me:8080/index.html => kid-wumeng.me
   *
   * @return { String } host
   */
   
  get hostname(){
    return this.host.split(':')[0]
  }
  
  
  
  /**
   * Return request port, for example:
   *
   *   http://kid-wumeng.me/index.html      => 80
   *   http://kid-wumeng.me:8080/index.html => 8080
   *
   * @return { int } port
   */
   
  get port(){
    let port = this.host.split(':')[1]
    if( port === undefined ){
      port = 80
    }
    return parseInt( port )
  }
  
  
  
  /**
   * Return request path, for example:
   *
   *   http://kid-wumeng.me/index.html?from=abcd => /index.html
   *   http://kid-wumeng.me/user/18?islogin=true => /user/18
   *
   * @return { String } path
   */
   
  get path(){
    return this.raw.req.url.split('?')[0]
  }

  
  
  /**
   * Return request querystring, for example:
   *
   *   http://kid-wumeng.me/index.html?from=abcd&islogin=true => from=abcd&islogin=true
   *
   * The result isn't includes the `?` mark
   *
   * @return { String | undefined } querystring
   */
   
  get querystring(){
    let q = this.method === 'GET' ?
      this.raw.req.url.split('?')[1]
    : this.raw.reqData

    if(typeof q === 'string' && q !== '')
      return q
    return undefined
  }
  
  
  
  /**
   * @return { int } length - return 0 if not found `Content-Length` field.
   */
   
  get length(){
    let len = this.get('Content-Length')
    return len ? len : 0
  }



  /**
   * Return a request header field
   *
   * @return { String | undefined } field's value
   *
   * @REVIEW sure return String ?
   */
   
  get( field ){
    field = field.toLowerCase()
    let headers = this.raw.req.headers
    
    switch( field ){
      case 'referer':
      case 'referrer':
        return headers.referer || headers.referrer || undefined
      default:
        return headers[field]
    }
  }
  
}


module.exports = Request



/**
 * Parse the querystring to query
 *
 * @param  { String } querystring
 * @return { Object } query - return {} if no queries
 */
function _parseQuery(querystring){
  if(querystring === undefined){
    return {}
  }
  
  let query = {}
  querystring.split('&').forEach(function(item){
    item = item.split('=')
    query[ item[0] ] = item[1]  // query.key = value
  })
  return query
}