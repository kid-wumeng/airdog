class Request {
  
  constructor(raw){
    this.raw = raw
  }
  
  get method(){
    return this.raw.req.method
  }
}



module.exports = Request