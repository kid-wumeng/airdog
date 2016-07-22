import requireDir from 'require-dir'
import fs from 'fs-extra'
import yaml from 'js-yaml'
import _ from 'lodash'
import * as client from './client'
import store from './store'
import * as net from './net'


(async()=>{try{

  global.BEO = __dirname
  global.CWD = process.cwd()

  client.init()

  global.$config = {
    database: yaml.safeLoad(fs.readFileSync(`${CWD}/config/database.yml`, 'utf8'))
  }

  net.init()

  await store.connect()

  global.ActiveRecord = store.ActiveRecord
  global.$model = requireDir(`${CWD}/model`)

  for(let name in $model){
    let model = $model[name]
    if(model._isActiveRecord){
      await store.wrap(model)
    }
  }


  await $model.Post.find().fetch()
  // setInterval(async()=>{
  //   await $model.User.create({'name': 'kid'})
  // }, 1000)




}catch(e){
  let msg = e instanceof Error ? e.stack : e
  console.log(`\x1b[31m${msg}\x1b[0m`)
}})()