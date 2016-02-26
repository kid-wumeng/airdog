class Response {
  
  constructor(app, raw){
    this.app = app
    this.raw = raw
    
    this._body = null
    this._status = 200
  }
  
  get body(){
    if(this._body === undefined)
      return null
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
  
  set type(value){
    this.set('Content-Type', value)
  }
}



/**
* Set a response header field
*/
Response.prototype.set = function(field, value){
  this.raw.res.setHeader(field, value)
}



module.exports = Response