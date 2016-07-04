export default class Collection {

  constructor(dname, cname){
    this.records = $database[dname].collection(cname)
  }


  async find(query){
    return await this.records.findOne(query)
  }


  async findAll(query){
    return await this.records.find(query)
  }


  async add(record){
    let result = {}
    try{
      await this.records.insert(record)
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
      let raw = await this.records.update(query, record)
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
      let raw = await this.records.remove(query, {single: true})
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