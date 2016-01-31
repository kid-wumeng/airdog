let Airdog = require('./lib/Application')
let app = new Airdog({
  static: 'test/static/'
})
var request = require('request')


async function common(){
  this.body = 'hahaha'
}

app.get('/abc2.html')
  .use(common)


app.listen(8080)



request.get('http://localhost:8080/abc2.html', function(err, res, body){
  console.log(body);
})
