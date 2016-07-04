import fs from 'fs'
import yaml from 'js-yaml'


export function init(){
  $config.database = load('database')
}


function load(name){
  // Read config file
  try{
    var file = fs.readFileSync(`${RUNTIME_DIR}/config/${name}.yml`, 'utf8')
  }catch(e){
    throw `Not Found: "config/${name}.yml"`
  }
  // Compile YAML
  try{
    return yaml.safeLoad(file)
  }catch(e){
    throw `Format Error: "config/${name}.yml" \n${e}`
  }
}