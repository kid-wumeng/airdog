// let Airdog = require('./lib/Application')
// let app = new Airdog
//
//
// app.get('/abc')
//   .use(async function m1(){
//     await this.next
//   })
//   .use(async function m2(){
//     await this.next
//   })
//   .use(async function m3(){
//     await this.next
//   })
//   .use(function(){
//     this.set('Content-Type', 'text/html')
//     this.status = '200'
//     this.body = '<script src="test2.js"></script>'
//   })
//
//
// app.get('test2.js', function(){
//   console.log(this.get('If-Modified-Since'));
//   this.set('Content-Type', 'text/javascript')
//   this.body = 'console.log("123")'
// })
//
//
// app.listen(8080)


var fs = require('./lib/async-await-fs')

async function fn(){
  try {
    var result = await fs.readFile('.gitignore', 'utf-8')
    console.log(result)
  } catch(e) {
    console.log(e);
  }
}

fn()
