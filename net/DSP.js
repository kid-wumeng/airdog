import store from '../store'

export default class DSP {

  constructor(webSocket){
    this.webSocket = webSocket

    store.activeQueryManager.on('modify', action=>{
      this.webSocket.broadcast('modify', action)
    })

    this.webSocket.on('create', (socket, action)=>{
      let {model, record} = action
      $model[model].create(record)
    })
  }

}