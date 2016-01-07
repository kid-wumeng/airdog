var Application = require('./Application')

async function m1(){
  console.log(this.port)
  this.body = 'ok'
}

var app = new Application

app.get('/users.html', m1)

app.listen(8080)