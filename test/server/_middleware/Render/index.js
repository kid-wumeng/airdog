"use strict"

app.get('login', function(){
  this.render('_user/_account/login.html', { name: 'kid' })
})