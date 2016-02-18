let Delegator = Airdog.import('Delegator')



test('Delegate Getter', function(){
  let src = {
    get g1(){ return 1 },
    get g2(){ return 2 }
  }
  let dest = {}
  new Delegator(dest, src)
    .getter('g1')
    .getter('g2')
  dest.g1.should.equal(1)
  dest.g2.should.equal(2)
})



test('Delegate Setter', function(){
  let val1 = 0
  let val2 = 0
  let src = {
    set s1(val){ val1 = val },
    set s2(val){ val2 = val }
  }
  let dest = {}
  new Delegator(dest, src)
    .setter('s1')
    .setter('s2')
  dest.s1 = 1
  dest.s2 = 2
  val1.should.equal(1)
  val2.should.equal(2)
})



test('Delegate Access', function(){
  let val1 = 0
  let val3 = 0
  let src = {
    get a1(){ return 1 },
    set a1(val){ val1 = val },
    get a2(){ return 2 },      // only getter
    set a3(val){ val3 = val }  // only setter
  }
  let dest = {}
  new Delegator(dest, src)
    .access('a1')
    .access('a2')
    .access('a3')
  dest.a1.should.equal(1)
  dest.a2.should.equal(2)
  dest.a1 = 1
  dest.a3 = 3
  val1.should.equal(1)
  val3.should.equal(3)
})



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



test('Delegate Async-Await ( Resolve )', async function(){
  let src = {}, dest = {}
  src.sleep = function(ms, callback){
    setTimeout(function(){
      callback(null, 'kid')
    }, ms)
  }
  
  new Delegator(dest, src)
    .async_await('sleep')

  let name = await dest.sleep(1)
  name.should.equal('kid')
})



test('Delegate Async-Await ( Reject )', async function(){
  let src = {}, dest = {}
  src.sleep = function(ms, callback){
    setTimeout(function(){
      callback('throw-error')
    }, ms)
  }
  
  new Delegator(dest, src)
    .async_await('sleep')
    
  try {
    await dest.sleep(1)
  } catch(e){
    e.should.equal('throw-error')
  }
})