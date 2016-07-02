export default class DB {

  constructor(name){
    this.name = name
    this.db = null
  }

  async connect(){
    this.db = this.ClientDB[name]
  }

  use(colName){
    return new Collection(this.db, colName)
  }
}