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


  get protocol(){
    return this.app.https ? 'https' : 'http'
  }

  
  get host(){
    return this.get('Host')
  }

  
  get hostname(){
    return this.host.split(':')[0]
  }
  
  
  get port(){
    let port = this.host.split(':')[1]
    if(!port)
      return 80
    return parseInt(port)
  }
  
  
  get type(){
    let type = this.get('Content-Type')
    if( type )
      return type.split(';')[0]
    return null
  }
  
}



/**
* Get a request header field
* @return { String | null } field's value
*/
Request.prototype.get = function(field)
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