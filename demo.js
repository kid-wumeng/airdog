import Airdog from './lib/Airdog'
import request from 'request'
import fs from 'fs'
import https from 'https'
let Server = Airdog.import('Server')

let s = new Server({
  static: `${__dirname}`
})

s.get('/', function(){
  // console.log(this.host);
})

s.listen(8080)

request.get({
  url: 'http://127.0.0.1:8080/index.js',
}, function(err, res, body){
  console.log(body);
  s.close()
})