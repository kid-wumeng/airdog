class Request {
  
  constructor(req, res){
    this.raw = {}
    this.raw.req = req
    this.raw.res = res
  }
  
  
  /**
   * @return { String } verb - `GET` | `POST` | ...
   */
   
  get verb(){
    return this.raw.req.method
  }
  
  
  
  /**
   * @return { String } method - `GET` | `POST` | ...
   */
   
  get method(){
    return this.verb
  }
  
  
  
  /**
   * Return request path, for example:
   *   `http://kid-wumeng.me/index.html?from=abcd` => `/index.html`
   *   `http://kid-wumeng.me/user/18?islogin=true` => `/user/18`
   *
   * @return { String } path
   *
   * @TODO /user?name=kid => /user
   */
   
  get path(){
    return this.raw.req.url
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