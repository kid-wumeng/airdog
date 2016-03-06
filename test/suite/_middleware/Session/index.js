"use strict"



const request = require('request')



test('Get and Set Session', function(done){
  client.get('/get-set', function(res, body){
    body.should.equal('')

    let co1 = request.cookie(res.headers['set-cookie'][0])
    let jar = request.jar()
    jar.setCookie(co1, 'http://127.0.0.1:8080')
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