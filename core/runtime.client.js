import * as database from 'AIRDOG_DIR/core/store/database.client'
import * as util     from 'AIRDOG_DIR/core/module/util.client'
import * as model    from 'AIRDOG_DIR/core/module/model.client'


global.$error = msg => { throw msg }


try{

  global.$database = {}
  global.$util = {}
  global.$model = {}

  database.init()
  util.init()
  model.init()

  let user = $model.User.find()
  console.log(user);

}catch(e){
  console.error(e)
}