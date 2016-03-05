"use strict"



const request = require('request')



test('Get Cookie', function(done){
  let co1 = request.cookie('name=kid')
  let co2 = request.cookie('age=18')
  
  let jar = request.jar()
  jar.setCookie(co1, 'http://127.0.0.1:8080/_middleware/Cookie')
  jar.setCookie(co2, 'http://127.0.0.1:8080/_middleware/Cookie')
  
  let options = { jar: jar }
  
  client.get('/get', options, function(res, body){
    body.should.equal(JSON.stringify({
      name: 'kid',
      age: '18'
    }))
    client.get('/get', function(res, body){
      body.should.equal('{}')
      done()
    })
  })
})



test('Set Cookie', function(done){
  client.get('/set', function(res, body){
    res.headers['set-cookie'][0].should.equal(`name=kid; expires=${body}; max-age=1000; path=/; domain=kid-wumeng.me; secure; httpOnly;`)
    res.headers['set-cookie'][1].should.equal('age=18; max-age=1000;')
    res.headers['set-cookie'][2].should.equal('like-color=blue;')
    done()
  })
})



test('Remove Cookie', function(done){
  client.get('/remove', function(res, body){
    res.headers['set-cookie'][0].should.equal('name=; max-age=-100000;')
    res.headers['set-cookie'][1].should.equal('age=; max-age=-100000;')
    done()
  })
})



test('Remove All-Cookies', function(done){
  let co1 = request.cookie('name=kid')
  let co2 = request.cookie('age=18')
  
  let jar = request.jar()
  jar.setCookie(co1, 'http://127.0.0.1:8080/_middleware/Cookie')
  jar.setCookie(co2, 'http://127.0.0.1:8080/_middleware/Cookie')
  
  let options = { jar: jar }
  
  client.get('/remove-all', options, function(res, body){
    res.headers['set-cookie'][0].should.equal('name=; max-age=-100000;')
    res.headers['set-cookie'][1].should.equal('age=; max-age=-100000;')
    done()
  })
})