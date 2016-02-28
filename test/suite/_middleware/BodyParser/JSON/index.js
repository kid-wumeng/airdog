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