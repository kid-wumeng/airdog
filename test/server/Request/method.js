server.get('/get', function(){
  this.body = this.method
})


server.post('/post', function(){
  this.body = this.method
})


server.put('/put', function(){
  this.body = this.method
})


server.del('/del', function(){
  this.body = this.method
})