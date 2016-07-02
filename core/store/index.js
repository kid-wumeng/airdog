import ActiveRecord from './ActiveRecord'

let dbDict = {}


export async function init(){
  let DB = require('./driver.MongoDB/DB')
  let db = new DB()
  await db.connect()
  dbDict.default = db
}


export function createDriver(Model){
  // if($util.is(Model.schema, 'nil')){
  //   $error(`$model.${Model.name}.schema not found`)
  // }
  // // @TODO object -> plain-object
  // if(!$util.is(Model.schema, 'object')){
  //   $error(`$model.${Model.name}.schema is't a plain-object`)
  // }
  let dbName = null || 'default'
  let colName = Model.name
  let db = dbDict['default']
  return db.use(colName)
}


export { ActiveRecord }