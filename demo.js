// import Airdog from './lib/Airdog'
// let Server = Airdog.import('Server')
// let request = require('request')
//
//
// var app = new Server
//
// app.all('/user/12')
// .use(async function(){
//   console.log('1 start');
//   await this.next
//   console.log('1 end');
// })
// .use(async function(){
//   console.log('2 start');
//   await this.next
//   console.log('2 end');
// })
// .use(async function(){
//   console.log('3 start');
//   await this.next
//   console.log('3 end');
// })
//
//
// app.get('/user/12')
// .use(async function(){
//   console.log('4 start');
//   await this.next
//   console.log('4 end');
// })
//
//
//
// app.listen(8080)
//
// request.get('http://localhost:8080/user/12', function(err, res, body){
//   console.log(body);
// })



import Airdog from './lib/Airdog'
let Delegator = Airdog.import('Delegator')


let a = {
  get name(){
    return 'wumeng'
  }
}

let b = {}

let delegator = new Delegator(b, a)
delegator.getter('name')

console.log(b.name)