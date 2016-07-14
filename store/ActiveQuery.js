export default class ActiveQuery {

  table = null
  name = null
  callback = null

  constructor(table, name, callback){
    this.table = table
    this.name = name
    this.callback = callback
  }

}