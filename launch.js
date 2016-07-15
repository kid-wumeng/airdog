import requireDir from 'require-dir'
import fs from 'fs-extra'
import yaml from 'js-yaml'
import _ from 'lodash'
import store from './store'


(async()=>{try{

  global.CWD = process.cwd()

  global.$config = {
    database: yaml.safeLoad(fs.readFileSync(`${CWD}/config/database.yml`, 'utf8'))
  }

  await store.connect()

  global.ActiveRecord = store.ActiveRecord
  global.$model = requireDir(`${CWD}/model`)

  for(let name in $model){
    let model = $model[name]
    if(model._isActiveRecord){
      await store.wrap(model)
    }
  }




  let Query = require('./store/Query')
  let query = new Query(store.table['User'], 'find')
  query.where('name', 'wu')
  // console.log(await query.fetch());



  let Modifier = require('./store/Modifier')
  let modifier = new Modifier(store.table['User'], query)
  let user = await modifier.set('name', 55).update()
  console.log(user);


}catch(e){
  let msg = e instanceof Error ? e.stack : e
  console.log(`\x1b[31m${msg}\x1b[0m`)
}})()