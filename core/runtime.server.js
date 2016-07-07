import fs from 'fs'
import * as database from './store/database.server'
import * as config from './module/config.server'
import * as util from './module/util.server'
import * as model from './module/model.server'
import Server from './net/Server'

;(async()=>{try{

  global.$database = {}
  global.$config = {}
  global.$util = {}
  global.$model = {}

  config.init()
  util.init()
  await database.init()
  await model.init()

  let bundle = fs.readFileSync(`${RUNTIME_DIR}/build/bundle.js`)
  let server = new Server()
  server.get('/', function*(){
    yield this.render('index', {bundle})
  })
  server.listen(3000)


  await $model.User.add({
    name: 'hi'
  })

  let LiveQuery = require('./store/LiveQuery.server')
  let liveQuery = new LiveQuery('User', {
    method: 'findAll',
    query: {name: 'hi'}
  })
  await liveQuery.init()

  $model.User.delete({name: 'hi'})


}catch(e){
  let msg = e instanceof Error ? e.stack : e
  console.log(`\x1b[31m${msg}\x1b[0m`)
}})()