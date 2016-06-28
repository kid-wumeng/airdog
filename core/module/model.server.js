import FileManager from './FileManager'
import ModuleManager from './ModuleManager'
import ActiveRecord from '../ActiveRecord.server'

global.$model = {}

let modelFileManager = new FileManager({
  root: `${PROJECT_DIR}/model`,
  depth: 1,
  types: ['js'],
  ignoreExt: true,
  watch: true,
})

let modelPaths = modelFileManager.getAllFilePaths()

// Init model modules
let modelManager = new ModuleManager()
modelManager.saveManyModules(modelPaths)
modelManager.forEach((name, model)=>{
  $model[name] = ModuleManager.combineModule(name, [ActiveRecord, model.common, model.server])
})

modelFileManager.on('addFile', (file)=>{
  let [name, model] = modelManager.saveModule(file.path)
  $model[name] = ModuleManager.combineModule(name, [ActiveRecord, model.common, model.server])
})

modelFileManager.on('updateFile', (file)=>{
  let [name, model] = modelManager.saveModule(file.path)
  $model[name] = ModuleManager.combineModule(name, [ActiveRecord, model.common, model.server])
})

modelFileManager.on('deleteFile', (file)=>{
  let [name, model] = modelManager.deleteModule(file.path)
  if(model.common || model.server){
    $model[name] = ModuleManager.combineModule(name, [ActiveRecord, model.common, model.server])
  }else{
    $model[name] = undefined
  }
})