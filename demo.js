let Airdog = require('./lib/Application')
let app = new Airdog({
  static: 'user'
})

app.get('/user2',async function(){
  this.body = await this.read('demo2.js')
})

app.listen(8080)