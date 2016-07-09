import EventEmitter from 'events'
import LiveQuery from './LiveQuery'

export default class LiveQueryTable extends EventEmitter {


  /**
  * A table seen like as:
  * {
  *   key_1: LiveQuery_1,
  *   key_2: LiveQuery_2,
  *   key_3: LiveQuery_3,
  *   ...
  * }
  */
  table = {}


  add(model, method, query){
    let key = this.key(model, method, query)
    if(!this.table[key]){
      let liveQuery = new LiveQuery(model, {method, query})
      liveQuery.on('addRecord', (model, record)=>{
        this.emit('addRecord', {key, model, record})
      })
      liveQuery.on('updateRecord', (model, record)=>{
        this.emit('updateRecord', {key, model, record})
      })
      liveQuery.on('removeRecord', (model, record)=>{
        this.emit('removeRecord', {key, model, record})
      })
      liveQuery.on('deleteRecord', (model, record)=>{
        this.emit('deleteRecord', {key, model, record})
      })
      liveQuery.init()
      this.table[key] = liveQuery
    }
    return key
  }


  key(model, method, query){
    let md5 = $util.md5(JSON.stringify(query))
    return `${model}---${method}---${md5}`
  }




}