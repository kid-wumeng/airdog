import requireDir from 'require-dir'
import ActiveRecord from './ActiveRecord'
import Schema from './Schema'
import Query from './Query'
import Modifier from './Modifier'
import ActiveQueryManager from './ActiveQueryManager'

export default class Store {

  ActiveRecord = ActiveRecord
  Query = Query

  _database = null
  _table = {}
  activeQueryManager = new ActiveQueryManager()


  async connect(){
    let driver = requireDir('./driver', {recurse: true})
    let config = $config.database
    this._database = new driver[config.driver].DB(config)
    await this._database.connect()
  }

  async wrap(model){
    await this.initTable(model)
  }


  async initTable(model){
    let _table = this._database.table(model.name)
    await _table.init(new Schema(model.schema), this)
    this._table[model.name] = _table
  }


  getTable(name){
    return this._table[name]
  }



  saveActiveQuery(activeQuery){
    this.activeQueryManager.save(activeQuery)
  }

}