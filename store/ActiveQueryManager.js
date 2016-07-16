import EventEmitter from 'events'
import ActiveQuery from './ActiveQuery'

export default class ActiveQueryManager extends EventEmitter {

  // For example,
  // {
  //   User: {
  //     all-users: activeQuery,
  //     ...
  //   },
  //   Post: {
  //     all-posts: activeQuery,
  //     ...
  //   },
  // }
  dict = {}

  save(activeQuery){
    activeQuery.on('modify', action=>{
      action.table = activeQuery.table.name
      this.emit(modify, action)
    })
    if(!this.dict[activeQuery.table.name]){
      this.dict[activeQuery.table.name] = {}
    }
    this.dict[activeQuery.table.name][activeQuery.id] = activeQuery
  }

}