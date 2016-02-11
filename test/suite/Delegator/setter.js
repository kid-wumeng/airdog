let Delegator = Airdog.import('Delegator')



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