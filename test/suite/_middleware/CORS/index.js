"use strict"


test('Allow *', function(done){
  client.get('/all', function(res, body){
    res.statusCode.should.equal(200)
    res.headers['access-control-allow-origin'].should.equal('*')
    done()
  })
})


test('Allow One Domain', function(done){
  // first request ( yes )
  let headers = { 'Origin': 'http://kid-wumeng.me' }
  let options = { headers: headers }
  client.get('/one-domain', options, function(res, body){
    res.statusCode.should.equal(200)
    res.headers['access-control-allow-origin'].should.equal('http://kid-wumeng.me')
    
    // second request ( no )
    let headers = { 'Origin': 'http://kid-wumeng.com' }
    let options = { headers: headers }
    client.get('/one-domain', options, function(res, body){
      res.statusCode.should.equal(200)
      res.headers['access-control-allow-origin'].should.equal('null')
      done()
    })
  })
})


test('Allow Multiple Domain', function(done){
  // first request ( yes )
  let headers = { 'Origin': 'http://kid-wumeng.me' }
  let options = { headers: headers }
  client.get('/multiple-domain', options, function(res, body){
    res.statusCode.should.equal(200)
    res.headers['access-control-allow-origin'].should.equal('http://kid-wumeng.me')

    // second request ( yes )
    let headers = { 'Origin': 'http://kid-wumeng.com' }
    let options = { headers: headers }
    client.get('/multiple-domain', options, function(res, body){
      res.statusCode.should.equal(200)
      res.headers['access-control-allow-origin'].should.equal('http://kid-wumeng.com')

      // third request ( no )
      let headers = { 'Origin': 'http://kid-wumeng.net' }
      let options = { headers: headers }
      client.get('/multiple-domain', options, function(res, body){
        res.statusCode.should.equal(200)
        res.headers['access-control-allow-origin'].should.equal('null')
        done()
      })
    })
  })
})


test('no Allow', function(done){
  client.get('/null', function(res, body){
    res.statusCode.should.equal(200)
    res.headers['access-control-allow-origin'].should.equal('null')
    done()
  })
})