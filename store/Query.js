import _ from 'lodash'
import store from './'

export default class Query {

  static FIND = 'find'
  static FIND_ALL = 'findAll'

  table = null
  method = null

  condition = {
    where: {},
    joins: [],
    sort: null,
    skip: null,
    limit: null,
  }

  _currentField = null


  constructor(table, method){
    this.table = table
    this.method = method
  }


  where(...args){
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


  where_id(id){
    this.condition['where']['id'] = id
    return this
  }


  where_field(field){
    this._currentField = field
    this.condition['where'][field] = {$isOp: true}
    return this
  }


  where_field_value(field, value){
    this.condition['where'][field] = _.cloneDeep(value)
    return this
  }


  where_obj(obj){
    for(let field in obj){
      this.condition['where'][field] = _.cloneDeep(obj[field])
    }
    return this
  }


  in(...args){
    let field = this.condition['where'][this._currentField]
    let isOneArray = _.isArray(args[0]) && args.length === 1
    isOneArray ?
      field['$in'] = _.cloneDeep(args[0])
    : field['$in'] = _.cloneDeep(args)
    return this
  }


  max(value){
    if(_.isNumber(value) || _.isDate(value)){
      this.condition['where'][this._currentField]['$max'] = _.cloneDeep(value)
      return this
    }else{
      throw `Invalid Param: Query.prototype.max()`
    }
  }


  min(value){
    if(_.isNumber(value) || _.isDate(value)){
      this.condition['where'][this._currentField]['$min'] = _.cloneDeep(value)
      return this
    }else{
      throw `Invalid Param: Query.prototype.min()`
    }
  }


  join(...fields){
    this.condition['joins'].push(...fields)
  }


  async fetch(){
    return await store.table[this.table][this.method](this.condition)
  }

}