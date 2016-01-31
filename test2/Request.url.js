require('babel-polyfill')
require('chai').should()
var request = require('request')


describe("{ Request.method }", function()
{
  
  it(" should return a url", function(done)
  {
    request.get('http://localhost:5000/request/url?name=kid&age=18', function(err, res, body){
      body.should.equal('http://localhost:5000/request/url?name=kid&age=18')
      done()
    })
  })
  
})