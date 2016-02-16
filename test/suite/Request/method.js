test('Method GET', function(done){
  client.get('/get', function(res, body){
    body.should.equal('GET')
    done()
  })
})



test('Method POST', function(done){
  client.post('/post', function(res, body){
    body.should.equal('POST')
    done()
  })
})



test('Method PUT', function(done){
  client.put('/put', function(res, body){
    body.should.equal('PUT')
    done()
  })
})



test('Method DELETE', function(done){
  client.del('/del', function(res, body){
    body.should.equal('DELETE')
    done()
  })
})