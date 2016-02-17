test('Get Host', function(done){
  client.get('/host', function(res, body){
    body.should.equal('127.0.0.1:8080')
    done()
  })
})