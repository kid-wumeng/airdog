import fs from 'fs-extra'
import webpack from 'webpack'

;(async()=>{


  global.AIRDOG_DIR  = require('path').dirname(__dirname)
  global.PROJECT_DIR = process.cwd()
  global.RUNTIME_DIR = `${AIRDOG_DIR}/project/default`


  fs.copySync(`${PROJECT_DIR}/config`, `${RUNTIME_DIR}/config`)
  fs.copySync(`${PROJECT_DIR}/model`, `${RUNTIME_DIR}/model`)


  // Compile client script
  let config = require('./webpack.config.js')
  let compiler = webpack(config)
  await new Promise(resolve=>{
    compiler.run((err, stat)=>{
      // console.log(stat.compilation.fileDependencies);
      resolve(stat)
    })
  })

try{
  require('./runtime.server')
}catch(e){
  console.log(e);
}

})()