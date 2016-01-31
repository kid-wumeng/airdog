require('babel-polyfill')
require('chai').should()
let toolkit = require('../lib/toolkit')


describe("{ toolkit.merge }", function()
{

  it(" should merge success", function()
  {
    let a = {
      name: 'kid',
      likes: ['comic', 'game']
    }
    let b = {
      age: 18,
      likes: ['music', 'code']
    }
    let c = toolkit.merge(a, b)
    c.should.deep.equal({
      name: 'kid',
      age: 18,
      likes: ['music', 'code']
    })
  })

})