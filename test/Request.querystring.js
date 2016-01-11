require('babel-polyfill')
require('chai').should()
var request = require('request')


describe("{ Request.querystring }", function()
{
  
  it(" should return a querystring", function(done)
  {
    request.get('http://localhost:5000/request/querystring?name=kid&age=18', function(err, res, body){
      body.should.equal('name=kid&age=18')
      done()
    })
  })
  
})