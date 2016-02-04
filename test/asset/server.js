let Airdog = require('../../lib/Airdog')
let app = new Airdog()

app.get('/body', function(){
  this.body = 'abc'
})

app.listen(8080)