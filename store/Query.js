import _ from 'lodash'


export default class Query {


  static FIND = 'find'
  static FIND_ALL = 'findAll'

  table = null
  method = null

  $where = {}
  $joins = []
  $sort = null
  $skip = null
  $limit = null

  _currentField = null



  constructor(table, method)
  {
    this.table = table
    this.method = method
  }



  where(...args)
  {
    let first = args[0]
    switch(true){
      case _.isNumber(first) && args.length === 1: return this.where_id(...args)
      case _.isString(first) && args.length === 1: return this.where_field(...args)
      case _.isString(first) && args.length === 2: return this.where_field_value(...args)
      case _.isPlainObject(first) && args.length === 1: return this.where_obj(...args)
      default:
        throw `Invalid Param: Query.prototype.where()`
    }
  }



  where_id(id)
  {
    this.$where['id'] = id
    return this
  }



  where_field(field)
  {
    this._currentField = field
    this.$where[field] = {}
    return this
  }



  where_field_value(field, value)
  {
    this.$where[field] = value
    return this
  }



  where_obj(data)
  {
    for(let field in data){
      this.$where[field] = data[field]
    }
    return this
  }



  in(...args)
  {
    let field = this.$where[this._currentField]
    args.length === 1 && Array.isArray(args[0]) ?
      field['$in'] = args[0]
    : field['$in'] = args
    return this
  }



  max(value)
  {
    if(_.isNumber(value) || _.isDate(value)){
      let field = this.$where[this._currentField]
      field['$max'] = value
      return this
    }else{
      throw `Invalid Param: Query.prototype.max()`
    }
  }



  min(value)
  {
    if(_.isNumber(value) || _.isDate(value)){
      let field = this.$where[this._currentField]
      field['$min'] = value
      return this
    }else{
      throw `Invalid Param: Query.prototype.min()`
    }
  }



  join(...fields)
  {
    this.$joins.push(...fields)
  }



  async fetch()
  {
    // @TODO Filter where
    // @TODO Ignore has removed record
    switch(this.method){
      case Query.FIND:
        return await this.fetchOne()
      case Query.FIND_ALL:
        return await this.fetchAll()
    }
  }



  async fetchOne()
  {
    let record = await this.table.find(this)
    if( record ){
      record = this.table.schema.filter(record)
    }
    return record
  }



  async fetchAll(){
    let records = await this.table.findAll(this)
    records = records.map(record=>{
      return this.table.schema.filter(record)
    })
    return records
  }

}