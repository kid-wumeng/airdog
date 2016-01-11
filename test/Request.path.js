require('babel-polyfill')
require('chai').should()
var request = require('request')


describe("{ Request.path }", function()
{
  
  it(" should return a path", function(done)
  {
    request.get('http://localhost:5000/request/path?name=kid&age=18', function(err, res, body){
      body.should.equal('/request/path')
      done()
    })
  })
  
})