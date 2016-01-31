require('babel-polyfill')
require('chai').should()
var request = require('request')


describe("{ Request.host }", function()
{
  
  it(" should return a host", function(done)
  {
    request.get('http://localhost:5000/request/host', function(err, res, body){
      body.should.equal('localhost:5000')
      done()
    })
  })
  
})