let MiddlewareQueue = Airdog.import('MiddlewareQueue')



test('Run All Normal-Functions', function(done){
    let flag = new Flag(1)
    let midQue = new MiddlewareQueue
    
    midQue.add(function(){
      flag.mark(1)
    })
    
    midQue.add(function(){
      flag.mark()
    })
    
    midQue.add(function(){
      flag.mark()
    })
    
    midQue.run()
    
    flag.assert()
    done()
})



test('Run All Async-Functions', async function(done){
  let flag = new Flag(6)
  let midQue = new MiddlewareQueue
  
  midQue.add(async function(){
    flag.mark(1)
    await this.next
    flag.mark(6)
    
    flag.assert()
    done()
  })
  
  midQue.add(async function(){
    flag.mark(2)
    await this.next
    flag.mark(5)
  })
  
  midQue.add(async function(){
    flag.mark(3)
    await this.next
    flag.mark(4)
  })
  
  await midQue.run()
})



test('Run 3/4 Async-Functions', async function(done){
  let flag = new Flag(5)
  let midQue = new MiddlewareQueue
  
  midQue.add(async function(){
    flag.mark(1)
    await this.next
    flag.mark(5)
    
    flag.assert()
    done()
  })
  
  midQue.add(async function(){
    flag.mark(2)
    await this.next
    flag.mark(4)
  })

  midQue.add(async function(){
    flag.mark(3)
  })
  
  midQue.add(async function(){
    flag.mark()
    await this.next
    flag.mark()
  })
  
  await midQue.run()
})


// test('Run Async-Functions with Context', async function(done){
// })