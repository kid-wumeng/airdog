export default class Collection {

  constructor(db, colName){
    this.records = db[colName]
  }


  async find(query)
    let record = null
  }


  async findAll(query){
  }


  async add(record){
  }


  async update(query, record){
  }


  async delete(query){
  }
}