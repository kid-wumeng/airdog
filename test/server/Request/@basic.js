app.get('/method-get', function(){
  this.body = this.method
})
app.post('/method-post', function(){
  this.body = this.method
})
app.put('/method-put', function(){
  this.body = this.method
})
app.del('/method-del', function(){
  this.body = this.method
})



app.get('protocol', function(){
  this.body = this.protocol
})
app.get('host', function(){
  this.body = this.host
})