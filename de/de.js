"use strict"

let s = new Airdog({})

s.get('/', function(){
  let username = this.session.username
  if(!username){
    this.session.username = 'kiddik'
    this.session.age = 18
  }
  this.removeSession('username')
  this.body = this.session
})

s.listen(8080)


// request.get({
//   url: 'http://127.0.0.1:8080/'
// }, function(err, res, body){
//   // s.close()
// })