let FS = require('fs')
let Server = Airdog.import('Server')
let server = new Server

server.get('/string', function(){
  this.body = 'string-data'
})
server.get('/empty-string', function(){
  this.body = ''
})
server.get('/buffer', function(){
  this.body = new Buffer('buffer-data')
})
server.get('/stream', function(){
  this.body = FS.createReadStream(`${__dirname}/_stream.txt`)
})
server.get('/null', function(){
  this.body = null
})
server.get('/undefined', function(){
  this.body = undefined
})
server.get('/object', function(){
  this.body = { name: 'kid', age: 18 }
})
server.get('/true', function(){
  this.body = true
})
server.get('/false', function(){
  this.body = false
})
server.get('/number', function(){
  this.body = 12
})

server.listen(8080)



// @TODO test res.length
// @TODO test res.Content-Type



test('Respond when this.body is String', function(done){
  client.get('/string', function(res, body){
    res.statusCode.should.equal(200)
    body.should.equal('string-data')
    done()
  })
})



test('Respond when this.body is Empty-String', function(done){
  client.get('/empty-string', function(res, body){
    res.statusCode.should.equal(200)
    body.should.equal('')
    done()
  })
})



test('Respond when this.body is Buffer', function(done){
  client.get('/buffer', function(res, body){
    res.statusCode.should.equal(200)
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
    body.should.equal('')
    done()
  })
})



test('Respond when this.body is undefined', function(done){
  client.get('/undefined', function(res, body){
    res.statusCode.should.equal(404)
    body.should.equal('')
    done()
  })
})



test('Respond when this.body is Object', function(done){
  client.get('/object', function(res, body){
    res.statusCode.should.equal(200)
    body.should.equal(JSON.stringify({ name: 'kid', age: 18 }))
    done()
  })
})



test('Respond when this.body is true', function(done){
  client.get('/true', function(res, body){
    res.statusCode.should.equal(200)
    body.should.equal('true')
    done()
  })
})



test('Respond when this.body is false', function(done){
  client.get('/false', function(res, body){
    res.statusCode.should.equal(200)
    body.should.equal('false')
    done()
  })
})



test('Respond when this.body is number', function(done){
  client.get('/number', function(res, body){
    res.statusCode.should.equal(200)
    body.should.equal('12')
    done()
  })
})