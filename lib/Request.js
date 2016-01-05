module.exports = {
  
  get verb(){
    return this.raw.req.method
  },
  
  get path(){
    return this.raw.req.url
  }
  
}
