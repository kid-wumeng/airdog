var route = require('./route')
var middleware = require('./middleware')

async function m1(){
  console.log('m1 start')
  await this.next()
  console.log('m1 end')
}

async function m2(){
  console.log('m2 start')
  await this.next()
  console.log('m2 end')
}


var routes = [
  { path: '/author/:aid/book/:bid/*', middleware: m1 },
  { path: '/author/kid/book/:bid/*', middleware: m2 },
]

route.TransformAll(routes)
var path = '/author/kid/book/16/all'
var middlewares = route.Search( path, routes )

middleware.Call(middlewares, {})