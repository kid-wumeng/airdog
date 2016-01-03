require('chai').should()
let route = require('../lib/route')


describe("{ route.convertType }", function()
{
  it(" should convert '12' to 12", function(){
    route.convertType('12').should.equal(12)
  })
  
  it(" should convert '12.5' to 12.5", function(){
    route.convertType('12.5').should.equal(12.5)
  })
  
  it(" should convert '12.0' to 12", function(){
    route.convertType('12.0').should.equal(12)
  })
  
  it(" should convert 'kid' to 'kid'", function(){
    route.convertType('kid').should.equal('kid')
  })
})
