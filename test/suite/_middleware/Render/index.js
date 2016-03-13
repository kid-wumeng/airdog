"use strict"


test('Render HTML', function(done){
  client.get('/login', function(res, body){
    body.should.equal('hi, kid')
    done()
  })
})