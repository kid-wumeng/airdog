app.get('/data-and-file', function(){
  this.body = {
    data: this.data,
    file: this.file
  }
})

app.post('/data-and-file', function(){
  this.body = {
    data: this.data,
    file: this.file
  }
})