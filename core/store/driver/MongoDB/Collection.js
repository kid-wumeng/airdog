export default class Collection {

  constructor(db, name){
    this.db = db
    this.col = db.conn.collection(name)
  }


  async find(query){
    return await this.col.findOne(query)
  }


  async findAll(query){
    let cursor = this.col.find(query)
    return await cursor.toArray()
  }


  async add(record){
    let id = 1122
    let result = await this.col.insert(record)
    return result.result.ok === 1? id: null
  }


  async update(query, record){
    await this.col.update(query, record)
  }


  async delete(query){
    await this.col.remove(query, {single: true})
  }
}