"use strict"


app.get('/get', async function(){
  this.body = this.cookie
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
  this.body = date.toUTCString()
})


app.get('/remove', async function(){
  this.removeCookie('name')
  this.removeCookie('age')
  this.body = 'ok'
})


app.get('/remove-all', async function(){
  this.setCookie('id', '12', 1000)
  this.removeCookie()
  this.body = 'ok'
})