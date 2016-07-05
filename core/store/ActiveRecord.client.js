import * as kit from 'AIRDOG_DIR/core/store/kit'

export default class ActiveRecord {

  static name = null
  static _col = null

  static find(query){
    let record = this._col.find(query)
    return record ?
      kit.createModel(this.name, record)
    : null
  }

  static findAll(query){
    let records = this._col.findAll(query)
    let i, record, models = []
    for(i = 0; i < records.length; i++){
      record = records[i]
      models.push(kit.createModel(this.name, record))
    }
    return models
  }

  static add(record){
    record.addDate = new Date
    this._col.add(record)
    return kit.createModel(this.name, record)
  }

  static update(query, record){
    record.updateDate = new Date
    return this._col.update(query, record)
  }

  static remove(query){
    // @TODO update $set
    let record = this.find(query)
    record.removeDate = new Date
    return this._col.update(query, record)
  }

  static delete(query){
    return this._col.delete(query)
  }

}