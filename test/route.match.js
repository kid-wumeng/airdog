require('chai').should()
let route = require('../lib/route')


describe("{ route.match }", function()
{
  
  describe("{ regexp-path is `/A/12/` }", function()
  {
    let regexp = route.transform('/A/12/')
  
    it(" should match `/A/12/` and return []", function(){
      route.match('/A/12/', regexp).should.deep.equal( [] )
    })
    
    it(" should match `/A/24/` and return false", function(){
      route.match('/A/24/', regexp).should.deep.equal(false)
    })
    
    it(" should match `/a/24/` and return false", function(){
      route.match('/a/24/', regexp).should.deep.equal(false)
    })
  })
  
  
  
  describe("{ regexp-path is `/A/:p1/` }", function()
  {
    let regexp = route.transform('/A/:p1/')
  
    it(" should match `/A/12/` and return [12]", function(){
      route.match('/A/12/', regexp).should.deep.equal( [12] )
    })
  
    it(" should match `/A/kid/` and return ['kid']", function(){
      route.match('/A/kid/', regexp).should.deep.equal( ['kid'] )
    })
    
    it(" should match `/A/中文/` and return ['中文']", function(){
      route.match('/A/中文/', regexp).should.deep.equal( ['中文'] )
    })
  })
  
  
  
  describe("{ regexp-path is `/:p1/A/` }", function()
  {
    let regexp = route.transform('/:p1/A/')
  
    it(" should match `/12/A/` and return [12]", function(){
      route.match('/12/A/', regexp).should.deep.equal( [12] )
    })
  })
  
  
  
  describe("{ regexp-path is `/A/:p1/:p2/` }", function()
  {
    let regexp = route.transform('/A/:p1/:p2/')
  
    it(" should match `/A/12/kid/` and return [12, 'kid']", function(){
      route.match('/A/12/kid/', regexp).should.deep.equal( [12, 'kid'] )
    })
  })
  
  
  
  describe("{ regexp-path is `/A/:p1/B/:p2/` }", function()
  {
    let regexp = route.transform('/A/:p1/B/:p2/')
  
    it(" should match `/A/12/B/kid/` and return [12, 'kid']", function(){
      route.match('/A/12/B/kid/', regexp).should.deep.equal( [12, 'kid'] )
    })
  })
  
  
  
  describe("{ regexp-path is `/A/:p1/B/:p2/C/` }", function()
  {
    let regexp = route.transform('/A/:p1/B/:p2/C/')
  
    it(" should match `/A/12/B/kid/C/` and return [12, 'kid']", function(){
      route.match('/A/12/B/kid/C/', regexp).should.deep.equal( [12, 'kid'] )
    })
  })
  
  
  
  describe("{ regexp-path is `/A/*/` }", function()
  {
    let regexp = route.transform('/A/*/')
  
    it(" should match `/A/1/2/3/` and return []", function(){
      route.match('/A/1/2/3/', regexp).should.deep.equal( [] )
    })
  })
  
  
  
  describe("{ regexp-path is `/*/A/` }", function()
  {
    let regexp = route.transform('/*/A/')
  
    it(" should match `/1/2/3/A/` and return []", function(){
      route.match('/1/2/3/A/', regexp).should.deep.equal( [] )
    })
  })
  
  
  
  describe("{ regexp-path is `/A/*/B/` }", function()
  {
    let regexp = route.transform('/A/*/B/')
  
    it(" should match `/A/1/2/3/B/` and return []", function(){
      route.match('/A/1/2/3/B/', regexp).should.deep.equal( [] )
    })
  })
  
  
  
  describe("{ regexp-path is `/A/*/B/*/` }", function()
  {
    let regexp = route.transform('/A/*/B/*/')
  
    it(" should match `/A/1/2/3/B/4/5/6/` and return []", function(){
      route.match('/A/1/2/3/B/4/5/6/', regexp).should.deep.equal( [] )
    })
  })
  
  
  
  describe("{ regexp-path is `/A/*/B/*/C/` }", function()
  {
    let regexp = route.transform('/A/*/B/*/C/')
  
    it(" should match `/A/1/2/3/B/4/5/6/C/` and return []", function(){
      route.match('/A/1/2/3/B/4/5/6/C/', regexp).should.deep.equal( [] )
    })
  })
  
  
  
  describe("{ regexp-path is `/A/*/B/:p1/C/` }", function()
  {
    let regexp = route.transform('/A/*/B/:p1/C/')
  
    it(" should match `/A/1/2/3/B/12/C/` and return []", function(){
      route.match('/A/1/2/3/B/12/C/', regexp).should.deep.equal( [12] )
    })
  })
  
  
  
  describe("{ regexp-path is `/A/:p1/B/*/C/` }", function()
  {
    let regexp = route.transform('/A/:p1/B/*/C/')
  
    it(" should match `/A/12/B/1/2/3/C/` and return []", function(){
      route.match('/A/12/B/1/2/3/C/', regexp).should.deep.equal( [12] )
    })
  })
  
})
