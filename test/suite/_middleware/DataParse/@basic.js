test('Parse Query', function(done){
  client.get('/data?name=kid&age=18', function(res, body){
    // @TODO support type-convert
    body.should.equal(JSON.stringify({
      name: 'kid',
      age: '18'
    }))
    done()
  })
})



test('Parse Form ( GET )', function(done){
  let form = { name: 'kid', age: 18 }
  let options = { form: form }
  client.get('/data', options, function(res, body){
    // @TODO support type-convert
    body.should.equal(JSON.stringify({
      name: 'kid',
      age: '18'
    }))
    done()
  })
})


test('Parse Form ( POST )', function(done){
  let form = { name: 'kid', age: 18 }
  let options = { form: form }
  client.post('/data', options, function(res, body){
    // @TODO support type-convert
    body.should.equal(JSON.stringify({
      name: 'kid',
      age: '18'
    }))
    done()
  })
})



test('Parse JSON ( GET )', function(done){
  let json = { name: 'kid', age: 18 }
  let options = { json: json }
  client.get('/data', options, function(res, body){
    // @TODO support type-convert
    body.should.eql({
      name: 'kid',
      age: 18
    })
    done()
  })
})



test('Parse JSON ( POST )', function(done){
  let json = { name: 'kid', age: 18 }
  let options = { json: json }
  client.post('/data', options, function(res, body){
    // @TODO support type-convert
    body.should.eql({
      name: 'kid',
      age: 18
    })
    done()
  })
})