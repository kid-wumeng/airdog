import http from 'http'
import route from './route'

class Application {
  
  
  constructor(){
    this.middlewares = []
    this.start = function(){}
    this.ctx = {}
  }
  
  
  
  use(middleware){
    this.middlewares.push( middleware )
  }
  combine(){
    let self = this
    // [m1, m2, ..., send]
    this.middlewares.push( this.send )
    let i = 0
    async function next(){
      await self.middlewares[i++].call(self.ctx, next)
    }
    this.start = next
  }
  initContext( req, res ){
    this.ctx = {
      req: req,
      res: res
    }
  }
  callback( req, res ){
    let ctx = this.initContext( req, res )
    this.start.call()
  }
  listen( port ){
    this.combine(this.middlewares)
    http.createServer(this.callback.bind(this)).listen(port)
  }
  send(){
    this.res.end('gf')
  }
}





// test


var app = new Application()

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

app.listen(8080)