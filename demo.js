let Airdog = require('./lib/Application')
let app = new Airdog({
  static: '/'
})


app.listen(8080)