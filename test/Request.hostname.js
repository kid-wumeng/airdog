require('babel-polyfill')
require('chai').should()
var request = require('request')


describe("{ Request.hostname }", function()
{
  
  it(" should return a hostname", function(done)
  {
    request.get('http://localhost:5000/request/hostname', function(err, res, body){
      body.should.equal('localhost')
      done()
    })
  })
  
})