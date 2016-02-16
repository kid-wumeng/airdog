app.get('/get', function(){
  this.body = this.method
})


app.post('/post', function(){
  this.body = this.method
})


app.put('/put', function(){
  this.body = this.method
})


app.del('/del', function(){
  this.body = this.method
})