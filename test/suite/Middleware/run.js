"use strict"
let Middleware = Airdog.import('Middleware')



test('Run Normal-Function', function(done){
  let fn = function(){ done() }
  new Middleware(fn).run({})
})



test('Run Async-Function', async function(done){
  let fn = async function(){
    await util.sleep(1)
    done()
  }
  await new Middleware(fn).run({})
})



test('Run Normal-Function with Config', function(){
  let fn = function(){
    this.config.name.should.equal('kid')
  }
  new Middleware(fn, { name: 'kid' }).run({})
})



test('Run Async-Function with Config', async function(done){
  let fn = async function(){
    await util.sleep(1)
    this.config.name.should.equal('kid')
    done()
  }
  await new Middleware(fn, { name: 'kid' }).run({})
})



test('Run Normal-Function with Context and Params', function(done){
  let fn = function(p1, p2){
    this.name.should.equal('kid')
    p1.should.equal('p1-value')
    p2.should.equal('p2-value')
    done()
  }
  let mid = new Middleware(fn)
  mid.params = ['p1-value', 'p2-value']
  mid.run({ name: 'kid' })
})



test('Run Async-Function with Context and Params', async function(done){
  let fn = async function(p1, p2){
    await util.sleep(1)
    this.name.should.equal('kid')
    p1.should.equal('p1-value')
    p2.should.equal('p2-value')
    done()
  }
  let mid = new Middleware(fn)
  mid.params = ['p1-value', 'p2-value']
  await mid.run({ name: 'kid' })
})