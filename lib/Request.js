class Request {
  
  constructor(req, res){
    this.raw = {}
    this.raw.req = req
    this.raw.res = res
  }
  
  get verb(){
    return this.raw.req.method
  }
  
  get method(){
    return this.verb
  }
  
  // @TODO /user?name=kid => /user
  get path(){
    return this.raw.req.url
  }
  
  get length(){
    let len = this.get('Content-Length')
    return len ? len : 0
  }

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