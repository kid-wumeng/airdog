class Response {
  
  constructor(app, raw){
    this.app = app
    this.raw = raw
  }
  
}



/**
* Set a response header field
*/
Response.prototype.set = function(field, value){
  this.raw.res.setHeader(field, value)
}



module.exports = Response