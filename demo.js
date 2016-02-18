import Airdog from './lib/Airdog'
import request from 'request'
let Server = Airdog.import('Server')

let s = new Server

s.get('/', function(){
  console.log('fffff')
  this.body = 123
})

s.listen(8080)

request.get('http://localhost:8080/', function(err, res, body){
  console.log(123);
  s.close()
})