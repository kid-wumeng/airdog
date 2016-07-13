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
  let query = new Query('User', 'find')
  query
    .where('name').in('kid')
    .join('posts')

  let r = await query.fetch()



  let Modifier = require('./store/Modifier')
  let modifier = new Modifier('User')
  let user = await modifier.set({
    name: '一二三',
    age: 333,
  }).create()
  console.log(user);





  // var model = require('./model');
  //
  // await store.init()
  // await model.init()
  //
  //
  // global.$model = model.dict
  //
  //
  // let query = new store.Query(store.Query.FIND)
  // query
  //   .where(1)
  //   .where('height').max(18).in([77])
  //   .where('age', 18)
  //   .where({name: 'kid'})
  //
  //   console.log(query.$where)


  // let user = await $model.User
  //   .find()
  //   .where({id: 1, age: 18})
  //   .where('age').max(18)
  //   .fetch()
  // console.log(user);


}catch(e){
  let msg = e instanceof Error ? e.stack : e
  console.log(`\x1b[31m${msg}\x1b[0m`)
}})()