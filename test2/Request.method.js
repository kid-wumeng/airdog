require('babel-polyfill')
require('chai').should()
var request = require('request')


describe("{ Request.method }", function()
{
  
  it(" should return a method ( GET )", function(done)
  {
    request.get('http://localhost:5000/request/method', function(err, res, body){
      body.should.equal('GET')
      done()
    })
  })
  
  it(" should return a method ( POST )", function(done)
  {
    request.post('http://localhost:5000/request/method', function(err, res, body){
      body.should.equal('POST')
      done()
    })
  })
  
  it(" should return a method ( PUT )", function(done)
  {
    request.put('http://localhost:5000/request/method', function(err, res, body){
      body.should.equal('PUT')
      done()
    })
  })
  
  it(" should return a method ( DELETE )", function(done)
  {
    request.del('http://localhost:5000/request/method', function(err, res, body){
      body.should.equal('DELETE')
      done()
    })
  })
  
})