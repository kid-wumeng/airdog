class Request {
  
  constructor(raw){
    this.raw = raw
  }
  
  get method(){
    return this.raw.req.method
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