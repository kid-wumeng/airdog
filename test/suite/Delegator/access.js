let Delegator = Airdog.import('Delegator')



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