let Delegator = Airdog.import('Delegator')



test('Delegate Method', function(){
  let src = {}, dest = {}
  src.fn1 = function(){ return 1 }
  src.fn2 = function(){ return 2 }
  new Delegator(dest, src)
    .method('fn1')
    .method('fn2')
  dest.fn1().should.equal(1)
  dest.fn2().should.equal(2)
})