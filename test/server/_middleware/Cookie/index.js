"use strict"


app.get('/get', async function(){
  this.body = {
    name: this.cookie.name,
    age: this.cookie.age
  }
})


app.get('/set', async function(){
  let date = new Date()
  this.setCookie('name', 'kid', {
    maxAge: 1000,
    expires: date,
    path: '/',
    domain: 'kid-wumeng.me',
    secure: true,
    httpOnly: true
  })
  this.setCookie('age', 18, 1000)
  this.setCookie('like-color', 'blue')
  this.body = date.toUTCString()
})


app.get('/remove', async function(){
  this.removeCookie('name')
  this.removeCookie('age', {'path': '/user'})
  this.body = 'ok'
})


app.get('/remove-all', async function(){
  this.setCookie('id', '12', 1000)
  this.removeCookie()
  this.body = 'ok'
})


app.get('/remove-all-op', async function(){
  this.setCookie('id', '12', 1000)
  this.removeCookie({'path': '/user'})
  this.body = 'ok'
})