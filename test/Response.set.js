require('babel-polyfill')
require('chai').should()
var request = require('request')


describe("{ Response.set }", function()
{

  it(" should return a custom-header", function(done)
  {
    request.get('http://localhost:5000/response/set/custom-header', function(err, res, body){
      res.headers.name.should.equal('kid')
      done()
    })
  })

})