import ModuleTable  from 'AIRDOG_DIR/core/module/ModuleTable'
import * as toolkit from 'AIRDOG_DIR/core/module/toolkit'

import ActiveRecord  from 'AIRDOG_DIR/core/store/ActiveRecord.client'
import * as database from 'AIRDOG_DIR/core/store/database.client'

export function init(){
  global.$model = {}
  let moduleTable = new ModuleTable()
  let req = require.context('RUNTIME_DIR/model', false, /^\.\/[^.]+(\.client)?.js$/)
  req.keys().forEach(path=>{
    let {name, type} = toolkit.moduleInfo(path)
    let module = req(path)
    moduleTable.save(name, type, module)
  })
  moduleTable.forEach((name, module)=>{
    $model[name] = toolkit.createClass(name, [ActiveRecord, module.common, module.client])
    database.driver($model[name])
  })
}