test('Set Custom-Header', function(done){
  client.get('/custom-header', function(res, body){
    res.headers['user-name'].should.equal('kid')
    done()
  })
})



test('Set Custom-Header ( Ignore Case )', function(done){
  client.get('/custom-header-big-hump', function(res, body){
    res.headers['user-name'].should.equal('kid')
    done()
  })
})