import store from '../store'

export default class DSP {

  constructor(webSocket){
    this.webSocket = webSocket
    this.store = store

    this.webSocket.on('subscribe', this.onSubscribe)
    this.webSocket.on('addRecord', (socket, {model, record})=>{
      $model[model].add(record)
    })
    this.webSocket.on('updateRecord', (socket, {model, query, record})=>{
      $model[model].update(query, record)
    })
    this.webSocket.on('removeRecord', (socket, {model, query})=>{
      $model[model].remove(query)
    })
    this.webSocket.on('deleteRecord', (socket, {model, query})=>{
      $model[model].delete(query)
    })

    this.store.on('addRecord', ({key, model, record})=>{
      this.webSocket.io.in(key).emit('addRecord', {model, record})
    })
    this.store.on('updateRecord', ({key, model, record})=>{
      this.webSocket.io.in(key).emit('updateRecord', {model, record})
    })
    this.store.on('removeRecord', ({key, model, record})=>{
      this.webSocket.io.in(key).emit('removeRecord', {model, record})
    })
    this.store.on('deleteRecord', ({key, model, record})=>{
      this.webSocket.io.in(key).emit('deleteRecord', {model, record})
    })
  }

  onSubscribe = async (socket, message) => {
    let id = socket.id
    let {model, method, query} = message
    let key = this.store.subscribe(model, method, query)
    socket.join(key)

    switch(method){
      case 'find':
        let record = await $model[model].find(query)
        if(record){
          socket.emit('addRecord', {model, record})
        }
        break
      case 'findAll':
        let records = await $model[model].findAll(query)
        if(records.length){
          socket.emit('addRecords', {model, records})
        }
        break
    }
  }

}