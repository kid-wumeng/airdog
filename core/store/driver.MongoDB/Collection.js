import mongodb from 'mongodb'

export default class Collection {

  constructor(db, colName){
    this.collection = db.collection(colName)
  }


  async find(query){
    return await this.collection.findOne(query)
  }


  async findAll(query){
    return await this.collection.find(query)
  }


  async add(record){
    let result = {}
    try{
      await this.collection.insert(record)
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
      let raw = await this.collection.update(query, record)
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
      let raw = await this.collection.remove(query, {single: true})
      result.ok = true
      result.n = raw.result.n
    }catch(e){
      console.log(e);
      result.ok = false
      result.reason = e.errmsg
    }
    return result
  }
}