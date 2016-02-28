test('Respond when this.body is String', function(done){
  client.get('/string', function(res, body){
    res.statusCode.should.equal(200)
    res.headers['content-type'].should.equal('text/plain')
    res.headers['content-length'].should.equal('11')
    body.should.equal('string-data')
    done()
  })
})



test('Respond when this.body is Empty-String', function(done){
  client.get('/empty-string', function(res, body){
    res.statusCode.should.equal(200)
    res.headers['content-type'].should.equal('text/plain')
    res.headers['content-length'].should.equal('0')
    body.should.equal('')
    done()
  })
})



test('Respond when this.body is Buffer', function(done){
  client.get('/buffer', function(res, body){
    res.statusCode.should.equal(200)
    res.headers['content-type'].should.equal('text/plain')
    res.headers['content-length'].should.equal('11')
    body.should.equal('buffer-data')
    done()
  })
})



test('Respond when this.body is Stream', function(done){
  client.get('/stream', function(res, body){
    res.statusCode.should.equal(200)
    body.should.equal('stream-data')
    done()
  })
})



test('Respond when this.body is null', function(done){
  client.get('/null', function(res, body){
    res.statusCode.should.equal(404)
    res.headers.should.not.include.keys('content-type')
    res.headers.should.not.include.keys('content-length')
    body.should.equal('')
    done()
  })
})



test('Respond when this.body is undefined', function(done){
  client.get('/undefined', function(res, body){
    res.statusCode.should.equal(404)
    res.headers.should.not.include.keys('content-type')
    res.headers.should.not.include.keys('content-length')
    body.should.equal('')
    done()
  })
})



test('Respond when this.body is Object', function(done){
  client.get('/object', function(res, body){
    let text = JSON.stringify({ name: 'kid', age: 18 })
    res.statusCode.should.equal(200)
    res.headers['content-type'].should.equal('application/json')
    res.headers['content-length'].should.equal(text.length.toString())
    body.should.equal(text)
    done()
  })
})



test('Respond when this.body is true', function(done){
  client.get('/true', function(res, body){
    res.statusCode.should.equal(200)
    res.headers['content-type'].should.equal('text/plain')
    res.headers['content-length'].should.equal('4')
    body.should.equal('true')
    done()
  })
})



test('Respond when this.body is false', function(done){
  client.get('/false', function(res, body){
    res.statusCode.should.equal(200)
    res.headers['content-type'].should.equal('text/plain')
    res.headers['content-length'].should.equal('5')
    body.should.equal('false')
    done()
  })
})



test('Respond when this.body is number', function(done){
  client.get('/number', function(res, body){
    res.statusCode.should.equal(200)
    res.headers['content-type'].should.equal('text/plain')
    res.headers['content-length'].should.equal('2')
    body.should.equal('12')
    done()
  })
})