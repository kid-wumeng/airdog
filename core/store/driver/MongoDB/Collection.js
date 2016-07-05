export default class Collection {

  constructor(db, name){
    this.db = db
    this.col = db.conn.collection(name)
  }


  async find(query){
    return await this.col.findOne(query)
  }


  async findAll(query){
    return await this.col.find(query)
  }


  async add(record){
    let result = {}
    try{
      await this.col.insert(record)
      result.ok = true
    }catch(e){
      result.ok = false
      result.reason = e.errmsg
    }
    return result
  }


  async update(query, record){
    let result = {}
    try{
      let raw = await this. ol.update(query, record)
      result.ok = true
      result.n = raw.result.nModified
    }catch(e){
      result.ok = false
      result.reason = e.errmsg
    }
    return result
  }


  async delete(query){
    let result = {}
    try{
      let raw = await this.col.remove(query, {single: true})
      result.ok = true
      result.n = raw.result.n
    }catch(e){
      result.ok = false
      result.reason = e.errmsg
    }
    return result
  }
}