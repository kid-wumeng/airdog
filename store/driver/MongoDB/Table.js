import _ from 'lodash'

export default class Table {

  name = null
  conn = null
  coll = null
  schema = null
  $store = null
  allowField = {}

  constructor(name, conn){
    this.name = name
    this.conn = conn
    this.coll = conn.collection(name)
    this.idFactory = conn.collection('id_factory')
  }

  async init(schema, $store){
    this.schema = schema
    this.parseAllowField()
    this.$store = $store
    let table = this.name
    let result = await this.idFactory.findOne({table})
    if(!result){
      this.idFactory.insert({table, id: 0})
    }
  }

  async find(query){
    let where = this.formatWhere(query.where)
    let fields = {_id: false, ...this.allowField}
    let record = await this.coll.findOne(where, {fields})
    await this.join(record, query.joins)
    // @TODO check field type
    return record
  }

  async findAll(query){
    let where = this.formatWhere(query.where)
    let fields = {_id: false, ...this.allowField}
    let cursor = this.coll.find(where, {fields})
    let records = await cursor.toArray()
    for(let i = 0; i < records.length; i++){
      await this.join(records[i], query.joins)
    }
    return records
  }

  async create(record){
    record = this.schema.filter(record)
    record.id = await this.makeID()
    let {result} = await this.coll.insert(record)
    delete record._id
    return result.ok? record.id: null
  }

  async update(query, record){
    this.coll.update({
      name: 'kid2'
    }, {
      id: {$inc: 1},
      name: 'kid2',
    })
    // let result = await this.coll.findAndModify(query, null, {$set: record}, {new: true})
    // return result.value
  }


  formatWhere(where){
    let $where = {}
    _.forEach(where, (value, field)=>{
      value = this.formatWhereEachField(field, value)
      _.set($where, field, value)
    })
    return $where
  }


  formatWhereEachField(field, value){
    if(_.isPlainObject(value) && value.$isOp){
      let op = {}
      if(value.$in!==undefined)  op.$in  = value.$in
      if(value.$max!==undefined) op.$lte = value.$max
      if(value.$min!==undefined) op.$gte = value.$min
      return op
    }
    return value
  }


  async makeID(){
    let table = this.name
    let $inc = {id: 1}
    let {value} = await this.idFactory.findAndModify({table}, null, {$inc}, {new: true})
    return value.id
  }


  async join(record, joinFields){
    let Query = this.$store.Query
    for(let i = 0; i < joinFields.length; i++){
      let field = joinFields[i]
      let op = this.schema.ref[field]
      let tablename = op.$ref
      record[field] = op.$type === Array ?
        await this.joinAll(tablename, record[field])
      : await this.joinOne(tablename, record[field])
    }
  }


  joinOne = async (tableName, id) => {
    let Query = this.$store.Query
    let query = new Query(tableName, Query.FIND)
    return await query.where('id', id).fetch()
  }


  joinAll = async (tableName, ids) => {
    let Query = this.$store.Query
    let query = new Query(tableName, Query.FIND_ALL)
    return await query.where('id').in(ids).fetch()
  }


  parseAllowField(){
    _.forEach(this.schema.normal, (value, field)=>{
      this.allowField[field] = true
    })
    _.forEach(this.schema.ref, (value, field)=>{
      this.allowField[field] = true
    })
  }

}