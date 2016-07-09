import LiveQueryTable from './LiveQueryTable'

export default class Store {

  table = new LiveQueryTable()

  subscribe(...params){
    return this.table.add(...params)
  }

  on(event, handler){
    this.table.on(event, handler)
    return this
  }

}