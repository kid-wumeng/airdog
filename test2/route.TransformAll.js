require('chai').should()
let route = require('../lib/route')


describe("{ route.TransformAll }", function()
{
  it(" should transform all paths of route to regexp", function(){
    var routes = [
      { path: '/A/:p1/B/*', middleware: function(){ return 0 } },
      { path: '/A/*/:p1/B', middleware: function(){ return 1 } },
    ]
    
    route.TransformAll(routes)
    
    routes.forEach(function(route, i){
      route.regexp.should.be.a('RegExp')
    })
    
    routes[0].path.should.equal('/A/:p1/B/*')
    routes[1].path.should.equal('/A/*/:p1/B')

    // To string for test
    routes[0].regexp.toString().should.equal('/^\\\/A\\\/([^\\\/]+?)\\\/B\\\/(?:.+)\\\/$/')
    routes[1].regexp.toString().should.equal('/^\\\/A\\\/(?:.+)\\\/([^\\\/]+?)\\\/B\\\/$/')

    routes[0].middleware().should.equal(0)
    routes[1].middleware().should.equal(1)
  })
})
