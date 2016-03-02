"use strict"

app.get('/system-header', function(){
  this.body = this.get('host')
})

app.get('/system-header-referer', function(){
  this.body = this.get('referer')
})

app.get('/system-header-referrer', function(){
  this.body = this.get('referrer')
})

app.get('/custom-header', function(){
  let username = this.get('user-name')
  username === null ?
    this.body = 'null'
  : this.body = username
})