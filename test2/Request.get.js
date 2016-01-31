require('babel-polyfill')
require('chai').should()
var request = require('request')


describe("{ Request.get }", function()
{
  
  it(" should return a custom-header", function(done)
  {
    request.get('http://localhost:5000/request/get/custom-header', {
      headers: {
        'custom-header': 'hello world ~ !'
      }
    }, function(err, res, body){
      body.should.equal('hello world ~ !')
      done()
    })
  })
  
})