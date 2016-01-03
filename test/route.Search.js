require('chai').should()
let route = require('../lib/route')


describe("{ route.Search }", function()
{
  it(" should search all matched middlewares and their actual-params", function()
  {
    var path = '/A/B/C/D'
    
    var routes = [
      // Should match success
      { path: '/A/B/C/D', middleware: function(){ return 's0' } },
      { path: '/A/:p1/*', middleware: function(){ return 's1' } },
      { path: '/A/*/:p1', middleware: function(){ return 's2' } },
      { path: '/A/*/:p1/:p2', middleware: function(){ return 's3' } },
      { path: '/*', middleware: function(){ return 's4' } },
      // Should match fail
      { path: '/:p1/:p2', middleware: function(){ return 'f0' } },
      { path: '/A/b/C/D', middleware: function(){ return 'f1' } },
    ]
    
    route.TransformAll(routes)
    var middlewares = route.Search( path, routes )
    
    middlewares.length.should.equal(5)
    
    middlewares[0].fn().should.equal('s0')
    middlewares[1].fn().should.equal('s1')
    middlewares[2].fn().should.equal('s2')
    middlewares[3].fn().should.equal('s3')
    middlewares[4].fn().should.equal('s4')
    
    middlewares[0].params.should.deep.equal( [] )
    middlewares[1].params.should.deep.equal( ['B'] )
    middlewares[2].params.should.deep.equal( ['D'] )
    middlewares[3].params.should.deep.equal( ['C','D'] )
    middlewares[4].params.should.deep.equal( [] )
  })
})
