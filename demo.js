let Airdog = require('./lib/Application')
let app = new Airdog



app.get('/abc')
  .use(async function m1(){
    console.log('m1 start')
    await this.next
    console.log('m1 end')
  })
  .use(async function m2(){
    console.log('m2 start')
    await this.next
    console.log('m2 end')
  })
  .use(async function m3(){
    console.log('m3 start')
    await this.next
    console.log('m3 end')
  })
  .use(function(){
    this.body = 'successful'
  })



app.listen(8080)