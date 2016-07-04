import FileManager from './kit/FileManager'

export function init(){
  if(FileManager.isDirectory(`${AIRDOG_DIR}/util`)){
    let file_manager = new FileManager({
      root: `${AIRDOG_DIR}/util`,
      types: ['js'],
    })
    let paths = file_manager.getAllFilePaths()
    paths.forEach(path=>{
      let module = require(path)
      for(let name in module){
        $util[name] = module[name]
      }
    })
  }else{
    // @TODO
    throw '标准util库损坏，请重新安装Airdog'
  }
}