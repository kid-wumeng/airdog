app.get('/custom-header', function(){
  this.set('user-name', 'kid')
  this.body = ''
})



app.get('/custom-header-big-hump', function(){
  this.set('User-Name', 'kid')
  this.body = ''
})