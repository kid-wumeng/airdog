var Application = require('./Application')

async function m1(){
  this.body = 'ok'
}

var app = new Application

app.get('/', m1)

app.listen(8080)