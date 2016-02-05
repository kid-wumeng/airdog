let Middleware      = Airdog.import('Middleware')
let MiddlewareQueue = Airdog.import('MiddlewareQueue')



test('Run All Normal-Functions', function()
{
  let flag = new Flag(1)

  function fn1(){ flag.mark(1) }
  function fn2(){ flag.mark() }
  function fn3(){ flag.mark() }
  
  let midQue = new MiddlewareQueue
  midQue.add(new Middleware(fn1))
  midQue.add(new Middleware(fn2))
  midQue.add(new Middleware(fn3))
  midQue.run()
  flag.assert()
})



test('Run All Normal-Functions & Async-Functions', async function(done)
{
  let flag = new Flag(3)
  
  async function fn1(){
    flag.mark(1)
    await this.next
    flag.mark(3)
    flag.assert()
    done()
  }
  
  function fn2(){
    flag.mark(2)
  }
  
  async function fn3(){
    flag.mark()
    await this.next
    flag.mark()
  }
  
  let midQue = new MiddlewareQueue
  midQue.add(new Middleware(fn1))
  midQue.add(new Middleware(fn2))
  midQue.add(new Middleware(fn3))
  await midQue.run()
})



test('Run All Async-Functions', async function(done)
{
  let flag = new Flag(6)
  
  async function fn1(){
    flag.mark(1)
    await this.next
    flag.mark(6)
    flag.assert()
    done()
  }
  
  async function fn2(){
    flag.mark(2)
    await this.next
    flag.mark(5)
  }
  
  async function fn3(){
    flag.mark(3)
    await this.next
    flag.mark(4)
  }
  
  let midQue = new MiddlewareQueue
  midQue.add(new Middleware(fn1))
  midQue.add(new Middleware(fn2))
  midQue.add(new Middleware(fn3))
  await midQue.run()
})



test('Run 3/4 Async-Functions', async function(done)
{
  let flag = new Flag(5)
  
  async function fn1(){
    flag.mark(1)
    await this.next
    flag.mark(5)
    flag.assert()
    done()
  }
  
  async function fn2(){
    flag.mark(2)
    await this.next
    flag.mark(4)
  }
  
  async function fn3(){
    flag.mark(3)
  }
  
  async function fn4(){
    flag.mark()
    await this.next
    flag.mark()
  }
  
  let midQue = new MiddlewareQueue
  midQue.add(new Middleware(fn1))
  midQue.add(new Middleware(fn2))
  midQue.add(new Middleware(fn3))
  midQue.add(new Middleware(fn4))
  await midQue.run()
})