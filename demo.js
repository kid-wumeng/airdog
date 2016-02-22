import Airdog from './lib/Airdog'
import request from 'request'
import fs from 'fs'
import https from 'https'
let Server = Airdog.import('Server')

let s = new Server()

s.get('/', function(){
  this.body = this.data
})

s.listen(8080)

request.get({
  url: 'http://127.0.0.1:8080',
  json: {
    name: 'kid',
    age: 18
  },
  headers: {
  }
}, function(err, res, body){
  console.log(typeof body);
  s.close()
})