import Collection from 'AIRDOG_DIR/core/store/driver.ClientDB/Collection'

export function init(){
  global.$database = {}
}


export function driver(modelClass){
  let database = 'default'
  let collection = modelClass.name
  modelClass._driver = new Collection(database, collection)
}