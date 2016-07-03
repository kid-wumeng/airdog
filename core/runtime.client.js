const base = require('AIRDOG_DIR/core/module/base.client')
const database = require('AIRDOG_DIR/core/store/database.client')
const util = require('AIRDOG_DIR/core/module/util.client')

base.init()
database.init()
util.init()

;(function(){

  const ModuleTable = require('AIRDOG_DIR/core/module/common/ModuleTable')
  const toolkit = require('AIRDOG_DIR/core/module/common/toolkit')
  const database = require('AIRDOG_DIR/core/store/database.client')

  global.$model = {}

  init_model()


  let user = $model.User.find()
  console.log(user);



  function init_model(){
    const ActiveRecord = require('AIRDOG_DIR/core/store/ActiveRecord.client')
    let moduleTable = new ModuleTable()
    let req = require.context('RUNTIME_DIR/model', false, /^\.\/[^.]+(\.client)?.js$/)
    console.log(req.keys());
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

})()