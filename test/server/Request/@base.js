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



app.get('url', function(){
  this.body = this.url
})
app.get('protocol', function(){
  this.body = this.protocol
})
app.get('host', function(){
  this.body = this.host
})
app.get('hostname', function(){
  this.body = this.hostname
})
app.get('port', function(){
  this.body = this.port
})
app.get('path', function(){
  this.body = this.path
})



app.get('type', function(){
  this.type === null ?
    this.body = 'null'
  : this.body = this.type
})