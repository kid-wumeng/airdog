import Query from './Query'
import Modifier from './Modifier'


export default class ActiveRecord {


  static _isActiveRecord = true
  static _table = null


  static find(...args)
  {
    let query = new Query(this._table, Query.FIND)
    if(args.length !== 0){
      query.where(...args)
    }
    return query
  }


  static findAll(...args){
    let query = new Query(this._table, Query.FIND_ALL)
    if(args.length !== 0){
      query.where(...args)
    }
    return query
  }


  static async create(record){
    let modifier = new Modifier(this._table)
    return await modifier.set(record).create()
  }


}