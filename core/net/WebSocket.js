const io = require('socket.io')

export default class WebSocket {

  constructor(http){
    this._eventDict = {}
    this.io = io(http.server)
  }

  on(name, handlers){
    if(!this._eventDict[name]){
      this._eventDict[name] = []
    }
    this._eventDict[name].push(handlers)
  }

  forEachEvent(iterator){
    let name, handlers
    for(name in this._eventDict){
      handlers = this._eventDict[name]
      iterator(name, (...args)=>{
        handlers.forEach(handler=>handler(...args))
      })
    }
  }

  broadcast(name, ...data){
    this.io.emit(name, ...data)
  }

  ready(){
    this.io.on('connection', socket=>{
      this.forEachEvent((name, callback)=>{
        socket.on(name, (...arg)=>{
          callback(socket, ...arg)
        })
      })
      socket.on('disconnect', ()=>{
        console.log(111);
      })
    })
  }
}