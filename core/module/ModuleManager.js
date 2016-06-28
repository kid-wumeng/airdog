import path from 'path'


export default class ModuleManager {


  /*
  * To manage the modules that is composed of parts
  * For example, a table see like:
  * {
  *   module_A: { common: module_A, client: module_A.client },
  *   module_B: { common: module_B, client: module_B.client, server: module_B.server },
  * }
  */

  table = {}




  /**
  * Save ( create or update ) the module with relative type
  * @param  (string) modulePath
  * @return [string, Object] - [moduleName, {common, client, server}]
  */

  saveModule(modulePath){
    let [name, type] = ModuleManager.getModuleStat(modulePath)
    let table = this.table
    if(!table[name]){
      table[name] = {}
    }
    if(table[name][type]){
      ModuleManager.cleanModule(modulePath)
    }
    let module = require(modulePath)
    table[name][type] = module
    return [name, table[name]]
  }




  /**
  * Save many modules
  * @param (string[])
  */

  saveManyModules(modulePaths){
    modulePaths.forEach(modulePath=>this.saveModule(modulePath))
  }




  /**
  * Delete module and clean the module's cache
  * @param  (string)
  * @return [string, Object] - [moduleName, {common, client, server}]
  */

  deleteModule(modulePath){
    let [name, type] = ModuleManager.getModuleStat(modulePath)
    ModuleManager.cleanModule(modulePath)
    this.table[name][type] = undefined
    return [name, this.table[name]]
  }




  /**
  * Iterate each row of table
  * @param (Function) - callback(moduleName, {common, client, server})
  */

  forEach(callback){
    for(let name in this.table){
      callback(name, this.table[name])
    }
  }




  /**
  * @static
  * Get the module stats
  * @param  (string)
  * @return [string, string] - [moduleName, moduleType]
  *         moduleName don't includes the type and ext ( module_A.server.js -> module_A )
  */

  static getModuleStat(modulePath){
    let ext = path.extname(modulePath)
    let name = path.basename(modulePath, ext)
    let type = 'common'
    name = name.replace(/(\.client|\.server)$/, (match)=>{
      type = match.slice(1)
      return ''
    })
    return [name, type]
  }




  /**
  * @static
  * Merge two modules ( dest <- src )
  * Include the static and prototype properties
  * The constructor is dest
  * @param (Object)
  * @param (Object)
  */

  static mergeModule(destModule, srcModule)
  {
    // Merge the static properties
    Reflect.ownKeys(srcModule)
      .filter(name=>!['name', 'length', 'prototype'].includes(name))
      .forEach(name=>destModule[name]=srcModule[name])

    // Merge the prototype properties
    if(srcModule.prototype){
      Reflect.ownKeys(srcModule.prototype)
        .filter(name=>!['constructor'].includes(name))
        .forEach(name=>destModule.prototype[name]=srcModule.prototype[name])
    }
  }




  /**
  * @static
  * Combine some modules to a new module
  * @param  (string)   - new module's name
  * @param  (Object[]) - from these modules
  * @return (Object)   - new module
  */

  static combineModule(newModuleName, modules){
    let newModule = eval(`class ${newModuleName} {}`)
    modules.forEach(module => module && ModuleManager.mergeModule(newModule, module))
    return newModule
  }




  /**
  * @static
  * Clean the module's cache
  * @param  (string)
  */

  static cleanModule(modulePath){
    var module = require.cache[modulePath]
    // @REVIEW Is clean the memory ?
    if(module.parent){
      module.parent.children.splice(module.parent.children.indexOf(module), 1)
    }
    require.cache[modulePath] = null
  }
}