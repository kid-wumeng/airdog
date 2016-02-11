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