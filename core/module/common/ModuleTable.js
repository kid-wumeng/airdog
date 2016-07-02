export default class ModuleManager {


  /*
  * A table seen like as:
  * {
  *   module_a: {common, client},
  *   module_b: {common, client, server},
  *   module_c: {common, server},
  *   ...
  * }
  * The key is module's name and the value is module ( Object )
  * For example, if there are some model modules: User.js and User.server.js
  * After save them to the table, a row will be created:
  * {
  *   User: {common: User.js, server: User.server.js},
  *   ...
  * }
  */

  table = {}




  /**
  * Save module ( create or update )
  * @param (string) name - such as "User"
  * @param (string) type - "common" | "client" | "server"
  * @param (Object) module
  */

  save(name, type, module){
    if(!this.table[name]){
      this.table[name] = {}
    }
    this.table[name][type] = module
  }




  /**
  * Delete module
  * @param (string) name - such as "User"
  * @param (string) type - "common" | "client" | "server"
  */

  del(name, type){
    this.table[name][type] = undefined
  }




  /**
  * Iterate each module
  * @param (Function) - callback(name, {common, client, server})
  */

  forEach(callback){
    for(let name in this.table){
      callback(name, this.table[name])
    }
  }
  
}