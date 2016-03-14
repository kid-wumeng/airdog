"use strict"

app.get('render', function(){
  this.render('_user/_account/login.html', { name: 'kid' })
})

app.get('render-no-data', function(){
  this.render('_user/_account/login.html')
})