import fs from 'fs'
import * as database from './store/database.server'
import * as config from './module/config.server'
import * as util from './module/util.server'
import * as model from './module/model.server'
import * as net from './net'
import LiveQuery from './store/LiveQuery'

;(async()=>{try{

  global.$database = {}
  global.$config = {}
  global.$util = {}
  global.$model = {}

  config.init()
  util.init()
  await database.init()
  await model.init()
  net.init()

  setInterval(()=>{
    $model.User.add({
      name: 'kid'
    })
  }, 2000)

}catch(e){
  let msg = e instanceof Error ? e.stack : e
  console.log(`\x1b[31m${msg}\x1b[0m`)
}})()