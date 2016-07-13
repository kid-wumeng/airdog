import requireDir from 'require-dir'
import ActiveRecord from './ActiveRecord'
import Query from './Query'
import Schema from './Schema'

export default class Store {

  ActiveRecord = ActiveRecord
  Query = Query

  database = null
  table = {}

  async connect(){
    let driver = requireDir('./driver', {recurse: true})
    let config = $config.database
    this.database = new driver[config.driver].DB(config)
    await this.database.connect()
  }

  async wrap(model){
    await this.initTable(model)
  }

  async initTable(model){
    let table = this.database.table(model.name)
    await table.init(new Schema(model.schema), this)
    this.table[model.name] = table
  }

}