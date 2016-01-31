require('babel-polyfill')
require('chai').should()
var request = require('request')


describe("{ Request.port }", function()
{
  
  it(" should return a port", function(done)
  {
    request.get('http://localhost:5000/request/port', function(err, res, body){
      body.should.equal('5000')
      done()
    })
  })
  
})