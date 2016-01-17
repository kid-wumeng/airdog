let Application = require('../../lib/Application')

let app = new Application



app.get('/normal/:p1', async function( p1 ){
  this.body = p1
})
app.post('/normal/:p1', async function( p1 ){
  this.body = p1
})
app.put('/normal/:p1', async function( p1 ){
  this.body = p1
})
app.del('/normal/:p1', async function( p1 ){
  this.body = p1
})


app.get('/json', async function(){
  this.body = {
    name: 'kid',
    age: 18
  }
})



app.get('/use/1')
  .use(async function(){
    this.testResult = []
    this.testResult.push('1 start')
    await this.next
    this.testResult.push('1 end')
    this.body = this.testResult.join(', ')
  })
  .use(async function(){
    this.testResult.push('2 start')
    await this.next
    this.testResult.push('2 end')
  })
  .use(async function(){
    this.testResult.push('3 start')
    await this.next
    this.testResult.push('3 end')
  })
  .use(function(){
    this.body = 'ok'
    this.testResult.push('body')
  })
  
app.get('/use/2', async function(){
  this.testResult = []
  this.testResult.push('0 start')
  await this.next
  this.testResult.push('0 end')
  this.body = this.testResult.join(', ')
})
  .use(async function(){
    this.testResult.push('1 start')
    await this.next
    this.testResult.push('1 end')
  })
  .use(async function(){
    this.testResult.push('2 start')
    await this.next
    this.testResult.push('2 end')
  })
  .use(async function(){
    this.testResult.push('3 start')
    await this.next
    this.testResult.push('3 end')
  })
  .use(function(){
    this.body = 'ok'
    this.testResult.push('body')
  })



app.get('/request/verb', function(){
  this.body = this.verb
})
app.post('/request/verb', function(){
  this.body = this.verb
})
app.put('/request/verb', function(){
  this.body = this.verb
})
app.del('/request/verb', function(){
  this.body = this.verb
})


app.get('/request/method', function(){
  this.body = this.method
})
app.post('/request/method', function(){
  this.body = this.method
})
app.put('/request/method', function(){
  this.body = this.method
})
app.del('/request/method', function(){
  this.body = this.method
})


app.get('/request/url', function(){
  this.body = this.url
})


app.get('/request/protocol', function(){
  this.body = this.protocol
})


app.get('/request/host', function(){
  this.body = this.host
})


app.get('/request/hostname', function(){
  this.body = this.hostname
})


app.get('/request/port', function(){
  this.body = this.port
})


app.get('/request/path', function(){
  this.body = this.path
})


app.get('/request/querystring', function(){
  this.body = this.querystring
})
app.post('/request/querystring', function(){
  this.body = this.querystring
})
app.put('/request/querystring', function(){
  this.body = this.querystring
})
app.del('/request/querystring', function(){
  this.body = this.querystring
})


app.get('/request/length', function(){
  this.body = this.length
})
app.post('/request/length', function(){
  this.body = this.length
})
app.put('/request/length', function(){
  this.body = this.length
})
app.del('/request/length', function(){
  this.body = this.length
})


app.get('/request/get/custom-header', function(){
  this.body = this.get('custom-header')
})


app.get('/response/status/getter', function(){
  this.body = this.status
})
app.get('/response/status/setter', function(){
  this.status = 302
  this.body = 'ok'
})


app.get('/response/type/json', function(){
  this.type = 'application/json'
  this.body = 'ok'
})


app.get('/response/set/custom-header', function(){
  this.set('name', 'kid')
  this.body = 'ok'
})


app.listen(5000)