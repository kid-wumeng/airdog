require('babel-polyfill')
require('chai').should()
var request = require('request')


describe("{ Request.length }", function()
{

  it(" should return a length ( GET )", function(done)
  {
    request.get('http://localhost:5000/request/length', function(err, res, body){
      body.should.equal('0')
      done()
    })
  })


  it(" should return a length ( POST )", function(done)
  {
    request.post('http://localhost:5000/request/length', {
      form: {
        name: 'kid',
        age: 18
      }
    }, function(err, res, body){
      body.should.equal('15')
      done()
    })
  })
  
  
  it(" should return a length ( PUT )", function(done)
  {
    request.put('http://localhost:5000/request/length', {
      form: {
        name: 'kid',
        age: 18
      }
    }, function(err, res, body){
      body.should.equal('15')
      done()
    })
  })
  
  
  it(" should return a length ( DELETE )", function(done)
  {
    request.del('http://localhost:5000/request/length', {
      form: {
        name: 'kid',
        age: 18
      }
    }, function(err, res, body){
      body.should.equal('15')
      done()
    })
  })

})