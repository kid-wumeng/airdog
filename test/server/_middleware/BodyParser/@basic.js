app.get('/data', function(){
  this.body = this.data
})

app.post('/data', function(){
  this.body = this.data
})

app.get('/data-and-file', function(){
  this.body = {
    data: this.data,
    file: this.file
  }
})