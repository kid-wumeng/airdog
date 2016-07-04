import ModuleTable  from 'AIRDOG_DIR/core/module/kit/ModuleTable'
import * as kit     from 'AIRDOG_DIR/core/module/kit'


import ActiveRecord  from 'AIRDOG_DIR/core/store/ActiveRecord.client'
import * as database from 'AIRDOG_DIR/core/store/database.client'


export function init(){
  let moduleTable = new ModuleTable()
  let req = require.context('RUNTIME_DIR/model', false, /^\.\/[^.]+(\.client)?.js$/)
  req.keys().forEach(path=>{
    let {name, type} = kit.moduleInfo(path)
    let module = req(path)
    moduleTable.save(name, type, module)
  })
  moduleTable.forEach((name, module)=>{
    $model[name] = kit.createClass(name, [ActiveRecord, module.common, module.client])
    database.driver($model[name])
  })
}