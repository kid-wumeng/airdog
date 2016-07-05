import * as kit from './kit'

export default class ActiveRecord {

  static _driver = null

  static async find(query){
    query.removeDate = null
    let record = await this._driver.find(query)
    return record ?
      kit.createModel(this.name, record)
    : null
  }

  static async findAll(query){
    query.removeDate = null
    let records = await this._driver.findAll(query)
    let i, record, models = []
    for(i = 0; i < records.length; i++){
      record = records[i]
      models.push(kit.createModel(this.name, record))
    }
    return models
  }

  static async add(record){
    record.addDate = new Date
    let id = await this._driver.add(record)
    if(id){
      record.id = id
      return kit.createModel(this.name, record)
    }else{
      return null
    }
  }

  static async update(query, record){
    query.removeDate = null
    record.updateDate = new Date
    return await this._driver.update(query, record)
  }

  static async remove(query){
    return await this._driver.update(query, {$set: {removeDate: new Date}})
  }

  static async delete(query){
    return await this._driver.delete(query)
  }


}