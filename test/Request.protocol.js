require('babel-polyfill')
require('chai').should()
var request = require('request')


describe("{ Request.protocol }", function()
{
  
  it(" should return a protocol", function(done)
  {
    request.get('http://localhost:5000/request/protocol', function(err, res, body){
      body.should.equal('http')
      done()
    })
  })
  
})