require('babel-polyfill')
require('chai').should()
let route = require('../lib/route')
let middleware = require('../lib/middleware')


describe("{ middleware.Call }", function()
{
  
  it(" can't change the this.next", function(done)
  {
    async function m(){
      this.next = 100
      
      // Test result
      this.next.should.not.equal(100)
      done()
    }
    
    var routes = [
      { path: '/A/:p1/B/:p2', middleware: m }
    ]
    
    route.TransformAll(routes)

    var path = '/A/12/B/kid'
    var middlewares = route.Search( path, routes )

    middleware.Call(middlewares, {})
  })
  
  
  
  
  it(" should call middlewares successfully", function(done)
  {
    var res = []
    
    async function sleep( ms ){
      new Promise(function(resolve, reject){
        setTimeout(function(){
          resolve()
        }, ms)
      })
    }
    
    async function m1(p1, p2){
      res.push('m1 start')
      res.push(p1)
      res.push(p2)
      res.push('sleep start')
      await sleep( 1000 )
      res.push('sleep end')
      await this.next
      res.push('m1 end')
      
      // Test result
      res.should.deep.equal( ['m1 start', 12, 'kid', 'sleep start', 'sleep end', 'm2 start', 12, 'm2 end', 'm1 end'] )
      done()
    }
    
    async function m2(p1){
      res.push('m2 start')
      res.push(p1)
      await this.next
      res.push('m2 end')
    }
    
    var routes = [
      { path: '/A/:p1/B/:p2', middleware: m1 },
      { path: '/A/:p1/B/*', middleware: m2 },
    ]
    
    route.TransformAll(routes)

    var path = '/A/12/B/kid'
    var middlewares = route.Search( path, routes )

    middleware.Call(middlewares, {})
  })
})