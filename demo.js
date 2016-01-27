let Airdog = require('./lib/Application')
let app = new Airdog({
  static: '/'
})


app.get('/', async function(){
  // this.body = require('fs').createReadStream('index.js')
  this.body = 9898
})


app.listen(8080)