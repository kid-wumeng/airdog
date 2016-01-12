class Response {
  

  constructor(req, res, reqData){
    this.raw = {}
    this.raw.req = req
    this.raw.res = res
    this.raw.reqData = reqData
  }
  
}


module.exports = Response