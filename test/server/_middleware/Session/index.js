"use strict"

app.get('/get-set', function(){
  let user = this.session.user
  if(!user){
    this.session.user = { name: 'kid', age: 18 }
  }
  this.body = user
})