require('chai').should()
let route = require('../lib/route')


describe("{ route.transform }", function()
{
  it(" should transform '/A/:p1/*' to /^\/A\/([^\/]+?)\/(?:.+)\/$/", function(){
    // To string for test
    route.transform('/A/:p1/*').toString().should.equal('/^\\\/A\\\/([^\\\/]+?)\\\/(?:.+)\\\/$/')
  })
})
