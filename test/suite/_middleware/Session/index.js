"use strict"


const request = require('request')


test('Get and Set Session', function(done){
  client.get('/get-set', function(res, body){
    body.should.equal('')

    let co  = request.cookie(res.headers['set-cookie'][0])
    let jar = request.jar()
    jar.setCookie(co, 'http://127.0.0.1:8080')
    let options = { jar: jar }

    client.get('/get-set', options, function(res, body){
      body.should.equal(JSON.stringify({
        name: 'kid',
        age: 18
      }))
      done()
    })
  })
})


test('Get and Set Session ( Timeout )', function(done){
  let app = new Airdog({
    'session': {
      'max-age': 10,
      'inspect-time': 10
    }
  })
  app.get('/', function(){
    let name = this.session.name
    if(!name)
      this.session.name = 'kid'
    this.body = name
  })
  app.listen(8081)
  
  request.get('http://127.0.0.1:8081', function(err, res, body)
  {
    body.should.equal('')
    
    let co  = request.cookie(res.headers['set-cookie'][0])
    let jar = request.jar()
    jar.setCookie(co, 'http://127.0.0.1:8080')
    let options = { jar: jar }
    
    setTimeout(function(){
      request.get('http://127.0.0.1:8081', options, function(err, res, body)
      {
        body.should.equal('')
        app.close()
        done()
      })
    }, 100)
    
  })
})


test('Remove Session-Data', function(done){
  client.get('/remove', function(res, body){
    body.should.equal(JSON.stringify({
      age: 18
    }))
    done()
  })
})


test('Remove All Session-Data', function(done){
  client.get('/remove-all', function(res, body){
    body.should.equal('')
    done()
  })
})