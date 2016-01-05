class Request {
  get path(){
    return this.raw.req.url
  }
}


module.exports = Request