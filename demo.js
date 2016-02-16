import Airdog from './lib/Airdog'
let Server = Airdog.import('Server')

let s = new Server

s.get('/', function(){
  console.log(this.method);
  this.body = 123
})

s.listen(8080)