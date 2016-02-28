app.get('/get-system-header', function(){
  this.body = this.get('host')
})

app.get('/get-system-header-referer', function(){
  this.body = this.get('referer')
})

app.get('/get-system-header-referrer', function(){
  this.body = this.get('referrer')
})

app.get('/get-custom-header', function(){
  let username = this.get('user-name')
  username === null ?
    this.body = 'null'
  : this.body = username
})