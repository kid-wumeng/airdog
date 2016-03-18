"use strict"

app.get('render', function(){
  this.render('user/account/login.html', { name: 'kid' })
})

app.get('render-no-data', function(){
  this.render('user/account/login.html')
})