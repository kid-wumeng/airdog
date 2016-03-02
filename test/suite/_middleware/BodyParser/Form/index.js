"use strict"


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