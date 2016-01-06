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


app.listen(5000)