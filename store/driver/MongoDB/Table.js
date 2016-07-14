import _ from 'lodash'

export default class Table {


  name = null
  conn = null
  coll = null
  schema = null
  store = null



  constructor(name, conn)
  {
    this.name = name
    this.conn = conn
    this.coll = conn.collection(name)
    this.idFactory = conn.collection('id_factory')
  }



  async init(schema, store)
  {
    // @REVIEW
    this.schema = schema
    this.store = store
    let table = this.name
    let result = await this.idFactory.findOne({table})
    if(!result){
      this.idFactory.insert({table, id: 0})
    }
  }



  async find(query)
  {
    let where = this.formatWhere(query.$where)
    // @TODO Set fields
    let record = await this.coll.findOne(where)
    await this.join(record, query.$joins)
    return record
  }



  async findAll(query)
  {
    let where = this.formatWhere(query.$where)
    // @TODO Set fields
    let cursor = this.coll.find(where)
    let records = await cursor.toArray()
    for(let i = 0; i < records.length; i++){
      await this.join(records[i], query.$joins)
    }
    return records
  }



  async create(modifier)
  {
    // @TODO $set => record (JSON)
    let record = modifier.$set
    record.id = await this.makeID()
    let {ops} = await this.coll.insert(record)
    return ops[0]
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



  async makeID()
  {
    let table = this.name
    let $inc = {id: 1}
    let {value} = await this.idFactory.findAndModify({table}, null, {$inc}, {new: true})
    return value.id
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