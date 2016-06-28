import FileManager from './FileManager'
import ModuleManager from './ModuleManager'

global.$util = {}

if(FileManager.isDirectory(`${AIRDOG_DIR}/util`)){
  let file_manager = new FileManager({
    root: `${AIRDOG_DIR}/util`,
    types: ['js'],
  })
  let paths = file_manager.getAllFilePaths()
  let module_manager = new ModuleManager()
  module_manager.saveManyModules(paths)
  module_manager.forEach((_, util)=>{
    for(let name in util.common){
      $util[name] = util.common[name]
    }
    for(let name in util.server){
      $util[name] = util.server[name]
    }
  })
}else{
  // @TODO
  throw '标准util库损坏，请重新安装Airdog'
}