import ModuleTable   from 'AIRDOG_DIR/core/module/kit/ModuleTable'
import * as kit      from 'AIRDOG_DIR/core/module/kit'
import ActiveRecord  from 'AIRDOG_DIR/core/store/ActiveRecord.client'
import Collection    from 'AIRDOG_DIR/core/store/driver.ClientDB/Collection'


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
    initDriver($model[name])
  })
}



function initDriver(Model){
  let dname = 'default'
  let cname = Model.name
  Model._driver = new Collection(dname, cname)
}