let Middleware = Airdog.import('Middleware')



test('Run Normal-Function', function(done){
  let input = done
  new Middleware(input).run()
})



test('Run Async-Function', async function(done){
  let input = async function(){
    await util.sleep(1)
    done()
  }
  await new Middleware(input).run()
})



test('Run Normal-Function with Context and Params', function(done){
  let input = function(p1, p2){
    this.name.should.equal('kid')
    p1.should.equal('p1-value')
    p2.should.equal('p2-value')
    done()
  }
  let mid = new Middleware(input)
  mid.run({ name: 'kid' }, ['p1-value', 'p2-value'])
})



test('Run Async-Function with Context and Params', async function(done){
  let input = async function(p1, p2){
    await util.sleep(1)
    this.name.should.equal('kid')
    p1.should.equal('p1-value')
    p2.should.equal('p2-value')
    done()
  }
  let mid = new Middleware(input)
  await mid.run({ name: 'kid' }, ['p1-value', 'p2-value'])
})