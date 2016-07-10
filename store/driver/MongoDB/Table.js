export default class {

  name = null
  conn = null
  coll = null

  constructor(name, conn){
    this.name = name
    this.conn = conn
    this.coll = conn.collection(name)
  }

  async find(query){
    return await this.coll.findOne(query)
  }

  async findAll(query){
    let cursor = await this.coll.find(query)
    return cursor.toArray()
  }

}