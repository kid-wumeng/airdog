import http from 'http'
import * as middleware from './middleware'


class App {
  constructor(){
    this.midQue = []
    this.next = function(){}
    this.ctx = {}
  }
  use( mid ){
    this.midQue.push(mid)
  }
  listen( port ){
    this.midQue.push(this.send)
    this.next = middleware.combine(this.midQue)
    http.createServer(this.callback.bind(this)).listen(8080)
  }
  callback(req, res){
    this.ctx = {
      req: req,
      res: res
    }
    this.next.call(this.ctx)
  }
  async send(next){
    this.res.end('gf')
  }
}





// test


var app = new App()

app.use(async function(next){
  console.log('m1 start')
  await next()
  console.log('m1 end')
})

app.use(async function(next){
  console.log('m2 start')
  await next()
  console.log('m2 end')
})

app.listen(3000)