app.get('/set-custom-header', function(){
  this.set('user-name', 'kid')
  this.body = ''
})



app.get('/set-custom-header-big-hump', function(){
  this.set('User-Name', 'kid')
  this.body = ''
})