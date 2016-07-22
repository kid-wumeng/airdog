if(global.isClient){
  var Query = require('BEO/store/Query')
  var Modifier = require('BEO/store/Modifier')
}else{
  var Query = require('./Query')
  var Modifier = require('./Modifier')
}


module.exports = class ActiveRecord {


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