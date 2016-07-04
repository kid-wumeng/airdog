import FileManager from './FileManager'
import ModuleTable from './ModuleTable'
import ActiveRecord from '../store/ActiveRecord.server'
import * as toolkit from './toolkit'
import * as database from '../store/database.server'

global.$model = {}

export function init(){
  let fileManager = new FileManager({
    root: `${PROJECT_DIR}/model`,
    depth: 1,
    types: ['js'],
    ignoreExt: true,
    watch: false,
  })
  let modulePaths = fileManager.getAllFilePaths()

  let moduleTable = new ModuleTable()
  modulePaths.forEach(path=>{
    let {name, type} = toolkit.moduleInfo(path)
    let module = require(path)
    moduleTable.save(name, type, module)
  })

  moduleTable.forEach((name, module)=>{
    $model[name] = toolkit.createClass(name, [ActiveRecord, module.common, module.client])
    database.setDriver($model[name])
  })
}