import Airdog from './lib/Airdog'
import request from 'request'
import fs from 'fs'
import https from 'https'
let Server = Airdog.import('Server')

let s = new Server()

s.get('/', function(){
  console.log(this.data);
  this.body = this.data
})

s.listen(8080)

request.get({
  url: 'http://127.0.0.1:8080',
  form: {
    name: 'kid',
    age: 18
  }
}, function(err, res, body){
  s.close()
})