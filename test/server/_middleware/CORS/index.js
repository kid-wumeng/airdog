"use strict"


app.get('/all', Airdog.CORS, {'allow-origin': '*'})
app.get('/all', function(){
  this.body = 'ok'
})


app.get('/one-domain', Airdog.CORS, {'allow-origin': 'http://kid-wumeng.me'})
app.get('/one-domain', function(){
  this.body = 'ok'
})


app.get('/multiple-domain', Airdog.CORS, {'allow-origin': ['http://kid-wumeng.me', 'http://kid-wumeng.com']})
app.get('/multiple-domain', function(){
  this.body = 'ok'
})


app.get('/null', Airdog.CORS)
app.get('/null', function(){
  this.body = 'ok'
})