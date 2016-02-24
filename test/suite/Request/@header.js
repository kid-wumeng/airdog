test('Get System-Header', function(done){
  client.get('/get-system-header', function(res, body){
    body.should.equal('127.0.0.1:8080')
    done()
  })
})



test('Get System-Header ( referer )', function(done){
  let headers = {'referer': 'localhost'}
  let options = { headers: headers }
  client.get('/get-system-header-referer', options, function(res, body){
    body.should.equal('localhost')
    done()
  })
})



test('Get System-Header ( referrer )', function(done){
  let headers = {'referer': 'localhost'}
  let options = { headers: headers }
  client.get('/get-system-header-referrer', options, function(res, body){
    body.should.equal('localhost')
    done()
  })
})



test('Get Custom-Header', function(done){
  let headers = {'user-name': 'kid'}
  let options = { headers: headers }
  client.get('/get-custom-header', options, function(res, body){
    body.should.equal('kid')
    done()
  })
})



test('Get Custom-Header ( Ignore Case )', function(done){
  let headers = {'User-Name': 'kid'}
  let options = { headers: headers }
  client.get('/get-custom-header', options, function(res, body){
    body.should.equal('kid')
    done()
  })
})



test('Get Custom-Header ( No-Exist )', function(done){
  client.get('/get-custom-header', function(res, body){
    body.should.equal('null')
    done()
  })
})