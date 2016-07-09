import store from '../store'

export default class DSP {

  constructor(webSocket){
    this.webSocket = webSocket
    this.store = store

    this.webSocket.on('subscribe', this.onSubscribe)
    this.store.on('addRecord', ({key, model, record})=>{
      console.log(Math.random());
      this.webSocket.io.in(key).emit('addRecord', {model, record})
    })
  }

  onSubscribe = (socket, message) => {
    let id = socket.id
    let {model, method, query} = message
    let key = this.store.subscribe(model, method, query)
    socket.join(key)
  }

}