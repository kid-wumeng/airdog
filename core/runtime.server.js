import fs from 'fs'
import * as store from './store'
import * as config from './module/config.server'
import * as util from './module/util.server'
import * as model from './module/model.server'
import Server from './net/Server'

;(async()=>{try{


  global.$config = {}
  global.$util = {}
  global.$model = {}

  await store.init()
  config.init()
  util.init()
  model.init()

  let bundle = fs.readFileSync(`${RUNTIME_DIR}/build/bundle.js`)
  let server = new Server()
  server.get('/', function*(){
    yield this.render('index', {bundle})
  })
  server.listen(3000)


}catch(e){
  console.log(`\x1b[31m${e}\x1b[0m`)
}})()