require('babel-polyfill')
require('chai').should()
var request = require('request')


describe("{ Request.verb }", function()
{
  
  it(" should return a verb ( GET )", function(done)
  {
    request.get('http://localhost:5000/request/verb', function(err, res, body){
      body.should.equal('GET')
      done()
    })
  })
  
  it(" should return a verb ( POST )", function(done)
  {
    request.post('http://localhost:5000/request/verb', function(err, res, body){
      body.should.equal('POST')
      done()
    })
  })
  
  it(" should return a verb ( PUT )", function(done)
  {
    request.put('http://localhost:5000/request/verb', function(err, res, body){
      body.should.equal('PUT')
      done()
    })
  })
  
  it(" should return a verb ( DELETE )", function(done)
  {
    request.del('http://localhost:5000/request/verb', function(err, res, body){
      body.should.equal('DELETE')
      done()
    })
  })
  
})