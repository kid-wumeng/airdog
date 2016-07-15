import _ from 'lodash'


export default class Modifier {


  table = null
  query = null
  $set = {}
  // @TODO The method inc()
  $inc = {}



  constructor(table, query)
  {
    this.table = table
    this.query = query
  }



  set(...args)
  {
    let first = args[0]
    switch(true){
      case _.isString(first) && args.length === 2: return this.set_field_value(...args)
      case _.isPlainObject(first) && args.length === 1: return this.set_obj(...args)
      default:
        throw `Invalid Param: Query.prototype.set()`
    }
  }



  set_field_value(field, value){
    if(this.validField(field, value)){
      this.$set[field] = value
    }
    return this
  }



  set_obj(obj){
    for(let field in obj){
      let value = obj[field]
      if(this.validField(field, value)){
        this.$set[field] = value
      }
    }
    return this
  }



  validField(field, value){
    let schema = this.table.schema
    if(!schema.existField(field)){
      throw `The field ${field} is not exist in schema`
    }
    return schema.validField(field, value)
  }



  async create()
  {
    this.$set['createDate'] = new Date
    let record = await this.table.create(this)
    if( record )
      record = this.table.schema.filter(record)
    return record
  }



  async update()
  {
    delete this.$set['id']  // Can't update id
    this.$set['updateDate'] = new Date
    let record = await this.table.update(this.query, this)
    if( record )
      record = this.table.schema.filter(record)
    return record
  }



  async remove()
  {
    this.$set['removeDate'] = new Date
    let record = await this.table.update(this.query, this)
    if( record )
      record = this.table.schema.filter(record)
    return record
  }



  async delete()
  {
    let record = await this.table.delete(this.query)
    if( record )
      record = this.table.schema.filter(record)
    return record
  }

}