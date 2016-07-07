import EventEmitter from 'events'
import * as kit from './kit'

export default class ActiveRecord extends EventEmitter {

  static _driver = null


  static _staticEventEmitter = new EventEmitter


  static async find(query){
    query = query || {}
    query.removeDate = null
    let record = await this._driver.find(query)
    return record ?
      kit.createModel(this.name, record)
    : null
  }


  static async findAll(query){
    query = query || {}
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
      let model =  kit.createModel(this.name, record)
      this.emit('addRecord', record)
      return model
    }else{
      return null
    }
  }


  static async update(query, record){
    query = query || {}
    query.removeDate = null
    record.updateDate = new Date
    record = await this._driver.update(query, record)
    this.emit('updateRecord', record)
    return record
  }


  static async remove(query){
    query = query || {}
    query.removeDate = null
    let record = await this._driver.update(query, {removeDate: new Date})
    this.emit('removeRecord', record)
    return result
  }


  static async delete(query){
    query = query || {}
    // @REVIEW is delete the has removed ?
    let record = await this._driver.delete(query)
    this.emit('deleteRecord', record)
    return record
  }


  static on(){
    this._staticEventEmitter.on(...arguments)
    return this
  }

  static emit(){
    this._staticEventEmitter.emit(...arguments)
    return this
  }

}