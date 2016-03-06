"use strict"


app.get('/get-set', function(){
  let user = this.session.user
  if(!user){
    this.session.user = { name: 'kid', age: 18 }
  }
  this.body = user
})


app.get('/remove', function(){
  this.session.name = 'kid'
  this.session.age = 18
  this.removeSession('name')
  this.body = this.session
})


app.get('/remove-all', function(){
  this.session.user = { name: 'kid', age: 18 }
  this.removeSession()
  this.body = this.session.user
})