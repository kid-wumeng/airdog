import FileManager from './FileManager'
import ModuleManager from './ModuleManager'
import * as store from '../store'

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
modelManager.forEach((name, modelGroup)=>{
  $model[name] = createModel(name, modelGroup)
})

modelFileManager.on('addFile', (file)=>{
  let [name, modelGroup] = modelManager.saveModule(file.path)
  $model[name] = createModel(name, modelGroup)
})

modelFileManager.on('updateFile', (file)=>{
  let [name, modelGroup] = modelManager.saveModule(file.path)
  $model[name] = createModel(name, modelGroup)
})

modelFileManager.on('deleteFile', (file)=>{
  let [name, modelGroup] = modelManager.deleteModule(file.path)
  if(modelGroup.common || modelGroup.server){
    $model[name] = createModel(name, modelGroup)
  }else{
    $model[name] = undefined
  }
})


function createModel(name, modelGroup){
  let Model = ModuleManager.combineModule(name, [store.ActiveRecord, modelGroup.common, modelGroup.server])
  Model._driver = store.createDriver(Model)
  return Model
}