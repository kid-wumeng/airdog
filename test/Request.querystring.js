require('babel-polyfill')
require('chai').should()
var request = require('request')


describe("{ Request.querystring }", function()
{
  
  it(" should return a querystring ( GET )", function(done)
  {
    request.get('http://localhost:5000/request/querystring?name=kid&age=18', function(err, res, body){
      body.should.equal('name=kid&age=18')
      done()
    })
  })

  
  it(" should return a querystring ( POST )", function(done)
  {
    request.post('http://localhost:5000/request/querystring', {
      form: {
        name: 'kid',
        age: 18
      }
    }, function(err, res, body){
      body.should.equal('name=kid&age=18')
      done()
    })
  })
  
  
  it(" should return a querystring ( PUT )", function(done)
  {
    request.put('http://localhost:5000/request/querystring', {
      form: {
        name: 'kid',
        age: 18
      }
    }, function(err, res, body){
      body.should.equal('name=kid&age=18')
      done()
    })
  })
  
  
  it(" should return a querystring ( DELETE )", function(done)
  {
    request.del('http://localhost:5000/request/querystring', {
      form: {
        name: 'kid',
        age: 18
      }
    }, function(err, res, body){
      body.should.equal('name=kid&age=18')
      done()
    })
  })
  
})