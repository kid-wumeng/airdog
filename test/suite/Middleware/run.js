let Middleware = Airdog.import('Middleware')



test('Run Normal-Function', function(done){
  let fn = function(){ done() }
  new Middleware(fn).run()
})



test('Run Async-Function', async function(done){
  let fn = async function(){
    await util.sleep(1)
    done()
  }
  await new Middleware(fn).run()
})



test('Run Normal-Function with Context and Params', function(done){
  let fn = function(p1, p2){
    this.name.should.equal('kid')
    p1.should.equal('p1-value')
    p2.should.equal('p2-value')
    done()
  }
  let params = ['p1-value', 'p2-value']
  new Middleware(fn, params).run({ name: 'kid' })
})



test('Run Async-Function with Context and Params', async function(done){
  let fn = async function(p1, p2){
    await util.sleep(1)
    this.name.should.equal('kid')
    p1.should.equal('p1-value')
    p2.should.equal('p2-value')
    done()
  }
  let params = ['p1-value', 'p2-value']
  await new Middleware(fn, params).run({ name: 'kid' })
})