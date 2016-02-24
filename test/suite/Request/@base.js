import request from 'request'
let Server = Airdog.import('Server')



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



test('Get URL', function(done){
  client.get('/url?name=kid&age=18', function(res, body){
    body.should.equal('http://127.0.0.1:8080/Request/@base/url?name=kid&age=18')
    done()
  })
})
test('Get Protocol ( HTTP )', function(done){
  client.get('/protocol', function(res, body){
    body.should.equal('http')
    done()
  })
})
test('Get Host', function(done){
  client.get('/host', function(res, body){
    body.should.equal('127.0.0.1:8080')
    done()
  })
})
test('Get Host-Name', function(done){
  client.get('/hostname', function(res, body){
    body.should.equal('127.0.0.1')
    done()
  })
})
test('Get Port', function(done){
  client.get('/port', function(res, body){
    body.should.equal('8080')
    done()
  })
})
test('Get Path', function(done){
  client.get('/path', function(res, body){
    body.should.equal('/Request/@base/path')
    done()
  })
})



test('Get Type ( Form-Data )', function(done){
  let form = { name: 'kid', age: 18 }
  let options = { form: form }
  client.get('/type', options, function(res, body){
    body.should.equal('application/x-www-form-urlencoded')
    done()
  })
})
test('Get Type ( Custom )', function(done){
  let headers = {'Content-Type': 'Custom-Data-Type'}
  let options = { headers: headers }
  client.get('/type', options, function(res, body){
    body.should.equal('Custom-Data-Type')
    done()
  })
})
test('Get Type ( null )', function(done){
  client.get('/type', function(res, body){
    body.should.equal('null')
    done()
  })
})