const http = require('http')
const koa = require('koa')
const router = require('koa-router')
const io = require('socket.io')


class Server {

  constructor(op){
    this.app = koa()
    this.router = router()
    this.io = null
    this.wsEvents = []
  }


  get(path, mid){
    this.router.get(path, mid)
  }


  addWSEvent(name, callback){
    this.wsEvents.push({name, callback})
  }


  listen(port){
    // Bind all HTTP routes
    this.app.use(this.router.routes())

    // To support Web-Socket
    let server = http.createServer(this.app.callback())
    this.io = io(server)

    // Bind all Web-Socket events
    this.io.on('connection', this.bindWSEvents.bind(this))

    // Notice, socket.io need a node-server ( not koa-app ) to listen
    server.listen(port)
  }


  bindWSEvents(socket){
    this.wsEvents.forEach((event)=>{
      socket.on(event.name, function(){
        event.callback.apply({socket}, arguments)
      })
    })
  }
}


module.exports = Server