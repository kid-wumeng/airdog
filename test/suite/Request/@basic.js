test('Get Method-GET', function(done){
  client.get('/method-get', function(res, body){
    body.should.equal('GET')
    done()
  })
})
test('Get Method-POST', function(done){
  client.post('/method-post', function(res, body){
    body.should.equal('POST')
    done()
  })
})
test('Get Method-PUT', function(done){
  client.put('/method-put', function(res, body){
    body.should.equal('PUT')
    done()
  })
})
test('Get Method-DELETE', function(done){
  client.del('/method-del', function(res, body){
    body.should.equal('DELETE')
    done()
  })
})



test('Get Host', function(done){
  client.get('/host', function(res, body){
    body.should.equal('127.0.0.1:8080')
    done()
  })
})