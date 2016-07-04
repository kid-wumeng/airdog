import * as base     from 'AIRDOG_DIR/core/module/base.client'
import * as database from 'AIRDOG_DIR/core/store/database.client'
import * as util     from 'AIRDOG_DIR/core/module/util.client'
import * as model    from 'AIRDOG_DIR/core/module/model.client'

base.init()
database.init()
util.init()
model.init()

;(function(){

  let user = $model.User.find()
  console.log(user);

})()