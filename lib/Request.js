class Request {
  
  constructor(app, raw){
    this.app = app
    this.raw = raw
  }
  
  
  get method(){
    return this.raw.req.method
  }
  
  
  get url(){
    return `${this.protocol}://${this.host}${this.raw.req.url}`
  }

  
  get host(){
    return this.get('Host')
  }
  
  
  get protocol(){
    return this.app.https ? 'https' : 'http'
  }
  
}



/**
* Get a request header field
* @return { String | null } field's value
*/
Request.prototype.get = function( field )
{
  field = field.toLowerCase()
  let headers = this.raw.req.headers
  let exist = field in headers
  
  if(!exist)
    return null
  
  switch(field){
    case 'referer':  return headers.referer
    case 'referrer': return headers.referrer
    default:
      return headers[field]
  }
}



module.exports = Request