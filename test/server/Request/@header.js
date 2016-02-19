app.get('/get-system-header', function(){
  this.body = this.get('host')
})

app.get('/get-custom-header', function(){
  let username = this.get('user-name')
  username === null ?
    this.body = 'null'
  : this.body = username
})