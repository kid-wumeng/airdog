var Application = require('./Application')

async function m1(name){
  console.log(name);
  console.log('m1 start')
  await this.next
  console.log('m1 end')
}

async function m2(){
  console.log('m2 start')
  await this.next
  console.log('m2 end')
}


var app = new Application

app.get('/user/:name', m1)

app.get('/user/*', m2)

app.listen(8080)