class Request {
  
  constructor(req, res){
    this.raw = {}
    this.raw.req = req
    this.raw.res = res
  }
  
  get verb(){
    return this.raw.req.method
  }
  
  get path(){
    return this.raw.req.url
  }
  
}


module.exports = Request