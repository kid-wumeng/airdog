let Airdog = require('./lib/Application')
let app = new Airdog({
  static: ['/test/static']
})


app.get('/', async function(){
  try {
    await this.render('test/static/abc.html', {
      title: 'this is airdog',
      name: 'kid is me'
    })
  } catch(e){
    console.log(e)
  }
})


app.listen(8080)