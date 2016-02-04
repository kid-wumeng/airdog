let MiddlewareQueue = Airdog.import('MiddlewareQueue')


// test('Run Normal-Functions', function(done){
// })

test('Run Async-Functions', function(done){
  let midQue = new MiddlewareQueue
  midQue.add(async function(){
    console.log('1 s');
    await this.next
    console.log('1 e');
    done()
  })
  midQue.add(async function(){
    console.log('2 s');
    console.log('2 e');
  })
  midQue.add(async function(){
    console.log('3 s');
    await this.next
    console.log('3 e');
  })
  midQue.run()
})


// test('Run Async-Functions with Context', async function(done){
// })