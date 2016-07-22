import fs from 'fs-extra'
import webpack from 'webpack'

export function init(){
  let config = require('./webpack.config.js')
  let compiler = webpack(config)
  compiler.run((err, stat)=>{
    // console.log(stat.compilation.fileDependencies);
  })
}