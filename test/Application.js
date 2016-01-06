require('babel-polyfill')
require('chai').should()
var request = require('request')


describe("{ Application }", function()
{
  
  it(" should receive a string with GET", function(done){
    request.get('http://localhost:5000/normal/kid', function(err, res, body){
      body.should.equal('kid')
      done()
    })
  })
  
  it(" should receive a string with POST", function(done){
    request.post('http://localhost:5000/normal/kid', function(err, res, body){
      body.should.equal('kid')
      done()
    })
  })
  
  it(" should receive a string with PUT", function(done){
    request.put('http://localhost:5000/normal/kid', function(err, res, body){
      body.should.equal('kid')
      done()
    })
  })
  
  it(" should receive a string with DELETE", function(done){
    request.del('http://localhost:5000/normal/kid', function(err, res, body){
      body.should.equal('kid')
      done()
    })
  })
  
  it(" should receive a json-string", function(done){
    request.get('http://localhost:5000/json', function(err, res, body){
      body.should.equal(JSON.stringify({
        name: 'kid',
        age: 18
      }))
      done()
    })
  })
  
  it(" should receive a statusCode 404 status if the url not found", function(done){
    request.get('http://localhost:5000/404', function(err, res, body){
      res.statusCode.should.equal(404)
      done()
    })
  })
    
})