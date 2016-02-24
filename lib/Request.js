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
    // @TODO Support HTTPS
    // return this.app.https ? 'https' : 'http'
    return 'http'
  }

  
  get host(){
    return this.get('Host')
  }

  
  get hostname(){
    return this.host.split(':')[0]
  }
  
  
  get port(){
    return this.app.port
  }
  
  
  get path(){
    return this.raw.req.url.split('?')[0]
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
  let headers = this.raw.req.headers
  let name = field.toLowerCase()
  let value
  
  switch(name){
    case 'referrer':
    case 'referer':
      value = headers.referrer || headers.referer; break
    default:
      value = headers[name]
  }
    
  return value ? value : null
}



module.exports = Request