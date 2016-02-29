test('Get Status', function(done){
  client.get('/status', function(res, body){
    body.should.equal('306')
    done()
  })
})



test('Get Type', function(done){
  client.get('/type', function(res, body){
    body.should.equal('application/airdog')
    done()
  })
})