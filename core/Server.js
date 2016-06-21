var http = require('http')
var io = require('socket.io')

module.exports = class {

  constructor(){
    this.http = http.createServer()
    this.io = io(this.http)
    this.events = []
  }

  on(name, callback){
    this.events.push({name, callback})
  }

  listen(port, callback){
    this.io.on('connection', (socket)=>{
      this.events.forEach((event)=>{
        socket.on(event.name, function(){
          event.callback.apply({socket}, arguments)
        })
      })
    })
    this.http.listen(port, callback)
  }
}