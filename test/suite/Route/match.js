let Route = Airdog.import('Route')



test('Match by Normal-Path', function(done){
  let fn = function(){
    arguments.length.should.equal(0)
    done()
  }
  let route = new Route('/src/image/icon/logo.png', fn)
  let mid = route.match('/src/image/icon/logo.png/')
  mid.run({})
})



test('Match by Mixed-Path', function(done){
  let fn = function(type, name){
    arguments.length.should.equal(2)
    type.should.equal('image')
    name.should.equal('logo.png')
    done()
  }
  let route = new Route('/src/:type/*/:name', fn)
  let mid = route.match('/src/image/icon/logo.png/')
  mid.run({})
})



test('Match by Mixed-Path ( Not Matched )', function(){
  let fn = function(){}
  let route = new Route('/src/:type/*/:name', fn)
  let mid = route.match('/res/image/icon/logo.png/')
  let flag = mid === null
  flag.should.true
})