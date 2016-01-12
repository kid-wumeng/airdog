class Response {
  

  constructor( req, res, reqData )
  {
    this._status = 200
    
    this.raw = {}
    this.raw.req = req
    this.raw.res = res
    this.raw.reqData = reqData
  }
  
  
  
  get status(){
    return this._status
  }
  
  set status( val ){
    this._status = val
  }
  
  
  
  /**
   * Set a response header field.
   * @param { String } field
   * @param { * } value
   * @TODO To convert JSON
   */
  set( field, value ){
    this.raw.res.setHeader(field, value)
  }
  
}


module.exports = Response