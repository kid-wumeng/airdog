require('babel-polyfill')
require('chai').should()
var request = require('request')


describe("{ Response.status }", function()
{

  it(" should return the status 200", function(done)
  {
    request.get('http://localhost:5000/response/status/getter', function(err, res, body){
      res.statusCode.should.equal(200)
      body.should.equal('200')
      done()
    })
  })
  
  it(" should return the status 302", function(done)
  {
    request.get('http://localhost:5000/response/status/setter', function(err, res, body){
      res.statusCode.should.equal(302)
      done()
    })
  })

})