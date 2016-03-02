"use strict"


app.get('/type', function(){
  this.type = 'application/airdog'
  this.body = this.res.type
})


app.get('/status', function(){
  this.status = 306
  this.body = this.status
})