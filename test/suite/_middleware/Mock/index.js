"use strict"

test('Get Real-Data', function(done){
  let app = new Airdog
  app.get('*', Airdog.Mock, {'dir': __dirname + '/_mocks'})
  app.get('/user/:id/profile', function(){
    this.body = 'ok'
  })
  app.listen(8081)
  
  request.get('http://127.0.0.1:8081/user/12/profile', function(err, res, body){
    res.statusCode.should.equal(200)
    body.should.equal('ok')
    done()
    app.close()
  })
})



test('Get Mock', function(done){
  let app = new Airdog({
    'debug': true
  })
  app.get('*', Airdog.Mock, {'dir': __dirname + '/_mocks'})
  app.get('/user/:id/profile', function(){
    this.body = 'ok'
  })
  app.listen(8081)
  
  request.get('http://127.0.0.1:8081/user/12/profile', function(err, res, body){
    res.statusCode.should.equal(200)
    body.should.equal(JSON.stringify({
      name: 'kid',
      age: 18
    }))
    done()
    app.close()
  })
})



test('Get Mock ( no exist )', function(done){
  let app = new Airdog({
    'debug': true
  })
  app.get('*', Airdog.Mock, {'dir': __dirname + '/_mocks'})
  app.get('/user/:id/profile', function(){
    this.body = 'ok'
  })
  app.listen(8081)
  
  request.get('http://127.0.0.1:8081/user/25/profile', function(err, res, body){
    res.statusCode.should.equal(404)
    body.should.equal('')
    done()
    app.close()
  })
})