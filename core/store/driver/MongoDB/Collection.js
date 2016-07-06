export default class Collection {

  constructor(db, name){
    this.db = db
    this.name = name
    this.IDFactory = db.conn.collection('IDFactory')
    this.col = db.conn.collection(name)
  }


  async init(){
    let result = await this.IDFactory.findOne({col: this.name})
    if(!result){
      this.IDFactory.insert({col: this.name, lastID: 0})
    }
  }


  async makeID(){
    let query = {col: this.name}
    let sort = null
    let $inc = {lastID: 1}
    let op = {new: true}
    let result = await this.IDFactory.findAndModify(query, sort, {$inc}, op)
    return result.value.lastID
  }


  async find(query){
    return await this.col.findOne(query)
  }


  async findAll(query){
    let cursor = this.col.find(query)
    return await cursor.toArray()
  }


  async add(record){
    let id = await this.makeID()
    let _id = id
    record = { id, _id, ...record }
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