import _ from 'lodash'

export default class Table {


  name = null
  records = null
  schema = null
  store = null


  constructor(name)
  {
    this.name = name
    this.records = $database[name]
  }



  async find(query)
  {
    let where = this.formatWhere(query.$where)
    let targetRecord = null
    this.records.some(record=>{
      if(this.match(record, where)){
        targetRecord = record
        return true
      }else{
        return false
      }
    })
    // await this.join(record, query.$joins)
    return targetRecord
  }



  async findAll(query)
  {
    let where = this.formatWhere(query.$where)
    let targetRecords = this.records.filter(record=>{
      return this.match(record, where)
    })
    // await this.join(record, query.$joins)
    return targetRecords
  }



  async create(modifier)
  {
    let set = modifier.$set
    let field, value
    let record = {}
    for(field in set){
      value = set[field]
      _.set(record, field, value)
    }
    // this.records.push(record)
    socket.emit('create', {model: this.name, record})
    return record
  }



  async update(query, modifier)
  {
    let where = this.formatWhere(query.$where)
    let updater = this.getUpdater(modifier)
    let op = {returnOriginal: false}
    let {value} = await this.coll.findOneAndUpdate(where, updater, op)
    return value
  }



  async delete(query){
    let where = this.formatWhere(query.$where)
    let {value} = await this.coll.findOneAndDelete(where)
    return value
  }


  match(record, where){
    let field, value
    for(field in where){
      value = where[field]
      if(_.get(record, field) != value){
        return false
      }
    }
    return true
  }


  formatWhere(where)
  {
    let $where = {}
    _.forEach(where, (value, field)=>{
      value = this.formatWhereEach(field, value)
      _.set($where, field, value)
    })
    return $where
  }



  formatWhereEach(field, value)
  {
    if(_.isPlainObject(value) && value.$isOp){
      let op = {}
      if(value.$in!==undefined)  op.$in  = value.$in
      if(value.$max!==undefined) op.$lte = value.$max
      if(value.$min!==undefined) op.$gte = value.$min
      return op
    }
    return value
  }



  getUpdater(modifier)
  {
    let updater = {}
    if(!_.isEmpty(modifier.$set)) updater.$set = modifier.$set
    if(!_.isEmpty(modifier.$inc)) updater.$inc = modifier.$inc
    return updater
  }


  async join(record, joinFields)
  {
    // @TODO The better algorithm to join muti-fields and array
    for(let i = 0; i < joinFields.length; i++){
      let field = joinFields[i]
      let op = this.schema.joinField[field]
      let table = this.store.getTable(op.$join)
      record[field] = op.$type === Array ?
        await this.joinAll(table, record[field])
      : await this.joinOne(table, record[field])
    }
  }



  joinOne = async (table, id) =>
  {
    let Query = this.store.Query
    let query = new Query(table, Query.FIND)
    return await query.where('id', id).fetch()
  }



  joinAll = async (table, ids) =>
  {
    let Query = this.store.Query
    let query = new Query(table, Query.FIND_ALL)
    return await query.where('id').in(ids).fetch()
  }

}