test('Method GET', function(){
  client.get('/get', function(res, body){
    body.should.equal('GET')
    done()
  })
})



test('Method POST', function(done){
  client.get('/post', function(res, body){
    body.should.equal('POST')
    done()
  })
})



test('Method PUT', function(done){
  client.get('/put', function(res, body){
    body.should.equal('PUT')
    done()
  })
})



test('Method DELETE', function(done){
  client.get('/del', function(res, body){
    body.should.equal('DELETE')
    done()
  })
})