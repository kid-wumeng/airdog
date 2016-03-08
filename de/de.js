"use strict"

let s = new Airdog({
  'session': {
    'max-age': 10000,
    'inspect-time': 10000
  }
})

s.get('/', function(){
  let username = this.session.username
  if(!username){
    this.session.username = 'kiddik'
    this.session.age = 18
  }
  this.removeSession()
  this.body = this.session
})


s.listen(8080)

request.get({
  url: 'http://127.0.0.1:8080/'
}, function(err, res, body){
  // console.log(body);
  s.close()
})


