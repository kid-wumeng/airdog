"use strict"
let FS = require('fs')


app.get('/string', function(){
  this.body = 'string-data'
})


app.get('/empty-string', function(){
  this.body = ''
})


app.get('/buffer', function(){
  this.body = new Buffer('buffer-data')
})


app.get('/stream', function(){
  this.body = FS.createReadStream(`${__dirname}/_stream.txt`)
})


app.get('/null', function(){
  this.body = null
})


app.get('/undefined', function(){
  this.body = undefined
})


app.get('/object', function(){
  this.body = { name: 'kid', age: 18 }
})


app.get('/true', function(){
  this.body = true
})


app.get('/false', function(){
  this.body = false
})


app.get('/number', function(){
  this.body = 12
})