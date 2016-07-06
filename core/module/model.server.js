import FileManager from './kit/FileManager'
import ModuleTable from './kit/ModuleTable'
import ActiveRecord from '../store/ActiveRecord.server'
import * as kit from './kit'


export async function init(){
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
    let {name, type} = kit.moduleInfo(path)
    let module = require(path)
    moduleTable.save(name, type, module)
  })

  await moduleTable.forEach(async(name, module)=>{
    $model[name] = kit.createClass(name, [ActiveRecord, module.common, module.client])
    await initDriver($model[name])
  })
}


async function initDriver(Model){
  let dname = Model.database || 'default'
  let cname = Model.collection || Model.name
  Model._driver = await $database[dname].use(cname)
}