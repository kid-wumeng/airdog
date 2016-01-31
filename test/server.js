let Airdog = require('../lib/Application')
let app = new Airdog()

app.get('/body', function(){
  this.body = 'abc'
})

app.listen(8080)