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
  
  it(" should receive '1 start', '2 start', '3 start', 'body', '3 end', '2 end', '1 end'", function(done){
    request.get('http://localhost:5000/use/1', function(err, res, body){
      body.should.equal('1 start, 2 start, 3 start, body, 3 end, 2 end, 1 end')
      done()
    })
  })
  
  it(" should receive '1 start', '2 start', '3 start', 'body', '3 end', '2 end', '1 end'", function(done){
    request.get('http://localhost:5000/use/2', function(err, res, body){
      body.should.equal('0 start, 1 start, 2 start, 3 start, body, 3 end, 2 end, 1 end, 0 end')
      done()
    })
  })

})