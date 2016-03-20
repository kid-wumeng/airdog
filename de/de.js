"use strict"

let s = new Airdog({
  'debug': true,
  'render': {
    'engine': 'hogan',
    'dir': `${__dirname}/views`
  },
  'mock': {
    'dir': __dirname + '/mocks'
  }
  // 'session': {
  //   'max-age': 10000000,
  //   'inspect-time': 10000000
  // }
})

// s.get('/', function(){
//   let username = this.session.username
//   if(!username){
//     this.session.username = 'kiddik'
//     this.session.age = 18
//   }
//   this.body = username
// })


// s.get('*', Airdog.CORS, {
//   'allow-origin': ['http://127.0.0.1:8081/', 'http://127.0.0.1:8082/']
// })
s.get('*', Airdog.Mock)
s.get('/user/:id/profile', function(){
  this.render('index.html', {'name': 'wumeng'})
})


s.listen(8080)

request.get({
  url: 'http://127.0.0.1:8080/user/12/profile'
}, function(err, res, body){
  console.log(body);
  s.close()
})