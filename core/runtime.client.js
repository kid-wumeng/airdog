const util = require('AIRDOG_DIR/core/module/util.client')
util.init()

;(function(){

  global.clientDB = {}

  const ModuleTable = require('AIRDOG_DIR/core/module/common/ModuleTable')
  const toolkit = require('AIRDOG_DIR/core/module/common/toolkit')

  global.$model = {}

  init_model()


  function init_model(){
    const ActiveRecord = require('AIRDOG_DIR/core/store/ActiveRecord')
    let moduleTable = new ModuleTable()
    let req = require.context('PROJECT_DIR/model', false, /^\.\/[^.]+(\.client)?.js$/)
    req.keys().forEach(path=>{
      let {name, type} = toolkit.moduleInfo(path)
      let module = req(path)
      moduleTable.save(name, type, module)
    })
    moduleTable.forEach((name, module)=>{
      $model[name] = toolkit.createClass(name, [ActiveRecord, module.common, module.client])
    })
  }

})()