require('babel-polyfill')
require('chai').should()
var request = require('request')


describe("{ Response.status }", function()
{

  it(" should return the Content-Type `application/json`", function(done)
  {
    request.get('http://localhost:5000/response/type/json', function(err, res, body){
      res.headers['content-type'].should.equal('application/json')
      done()
    })
  })

})