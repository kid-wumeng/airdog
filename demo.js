let Airdog = require('./lib/Application')
let app = new Airdog({
  static: 'test/static/'
})

async function common(){
  this.body = 'hahaha'
}

app.get('/abc2.html')
  .use(common)


app.listen(8080)