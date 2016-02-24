import Airdog from './lib/Airdog'
import request from 'request'
import fs from 'fs'
import https from 'https'
let Server = Airdog.import('Server')

let s = new Server()

s.get('/', function(){
  console.log(this.data);
  console.log(this.file);
})

s.listen(8080)

request.get({
  url: 'http://127.0.0.1:8080',
  formData: {
    myname: 'kid',
    filename: 'hahaha',
    like: ['Comic', 'Music'],
    'face' : {
      value: fs.createReadStream(__dirname + '/test1.txt'),
      options: {}
    },
    'photos' : [{
      value: fs.createReadStream(__dirname + '/test1.txt'),
      options: {}
    }, {
      value: fs.createReadStream(__dirname + '/test2.txt'),
      options: {}
    }]
  }
}, function(err, res, body){
  s.close()
})