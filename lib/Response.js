class Response {
  
  constructor(app, raw){
    this.app = app
    this.raw = raw
    
    this._body = null
    this._status = 200
  }
  
  get body(){
    return this._body
  }
  
  set body(value){
    this._body = value
  }
  
  get status(){
    return this._status
  }
  
  set status(value){
    this._status = value
  }
  
  get type(){
    return this.get('Content-Type')
  }
  
  set type(value){
    this.set('Content-Type', value)
  }
}



/**
* Get a response header field
*/
Response.prototype.get = function(name){
  name = name.toLowerCase()
  return this.raw.res.getHeader(name)
}



/**
* Set a response header field
*/
Response.prototype.set = function(name, value){
  this.raw.res.setHeader(name, value)
}



module.exports = Response