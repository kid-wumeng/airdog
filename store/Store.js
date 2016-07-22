if(global.isClient){
  var ActiveRecord = require('BEO/store/ActiveRecord')
  var Schema = require('BEO/store/Schema')
  var Query = require('BEO/store/Query')
  var Modifier = require('BEO/store/Modifier')
  var ActiveQueryManager = require('BEO/store/ActiveQueryManager')
}else{
  var ActiveRecord = require('./ActiveRecord')
  var Schema = require('./Schema')
  var Query = require('./Query')
  var Modifier = require('./Modifier')
  var ActiveQueryManager = require('./ActiveQueryManager')
}


export default class Store {

  ActiveRecord = ActiveRecord
  Query = Query
  _database = null
  _table = {}
  activeQueryManager = new ActiveQueryManager()


  async connect(){
    let config = $config.database
    let DB = require(`./driver/${config.driver}/DB`)
    this._database = new DB(config)
    await this._database.connect()
  }



  async wrap(model){
    await this.initTable(model)
  }


  async initTable(model){
    let _table = this._database.table(model.name)
    await _table.init(new Schema(model.schema), this)
    this._table[model.name] = _table
    model._table = _table
  }


  initVirtualTable(model){
    $database[model.name] = []
    let Table = require(`./driver/VirtualDB/Table`)
    let table = new Table(model.name)
    table.schema = new Schema(model.schema)
    table.store = this
    this._table[model.name] = Table
    model._table = table
  }


  getTable(name){
    return this._table[name]
  }


  saveActiveQuery(activeQuery){
    this.activeQueryManager.save(activeQuery)
  }

}