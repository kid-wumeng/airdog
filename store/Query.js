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
  _validFailed = false



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
    if(this.validField(field, value)){
      this.$where[field] = value
    }
    return this
  }



  where_obj(obj)
  {
    let field, value
    for(field in obj){
      value = obj[field]
      if(this.validField(field, value)){
        this.$where[field] = value
      }
    }
    return this
  }



  in(...args)
  {
    let field = this.$where[this._currentField]
    let isOneArray = args.length === 1 && Array.isArray(args[0])
    let value = isOneArray? args[0]: args
    if(this.validField(field, value)){
      field['$in'] = value
    }
    return this
  }



  max(value)
  {
    let field = this.$where[this._currentField]
    if(this.validField(field, value)){
      field['$max'] = value
    }
    return this
  }



  min(value)
  {
    let field = this.$where[this._currentField]
    if(this.validField(field, value)){
      field['$min'] = value
    }
    return this
  }



  join(...fields)
  {
    this.$joins.push(...fields)
  }



  validField(field, value){
    let schema = this.table.schema
    if(!schema.existField(field)){
      throw `The field ${field} is not exist in schema`
    }
    if(schema.validField(field, value)){
      return true
    }else{
      this._validFailed = true
      return false
    }
  }



  async fetch()
  {
    if(_.isEmpty(this.$where) && this._validFailed){
      return null
    }
    this.$where['removeDate'] = null
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
    if( record )
      record = this.table.schema.filter(record)
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