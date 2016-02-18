require('babel-polyfill')
require('chai').should()

let mocha = require('mocha')
let request = require('request')
const TEST_BASE = __dirname

global.suite = mocha.suite
global.test = mocha.test
global.suiteSetup = mocha.suiteSetup
global.suiteTeardown = mocha.suiteTeardown
global.setup = mocha.setup
global.teardown = mocha.teardown

global.Airdog = require('../lib/Airdog')
global.util = require('./asset/util')
global.Flag = util.Flag
global.clientBase = null



global.runSuite = function(module){
  let path = module.replace(/\./g, '/')
  suite(module, function(){
    suiteSetup(() => { global.clientBase = path })
    require(`${TEST_BASE}/suite/${path}`)
  })
}



global.addService = function(module){
  let path = module.replace(/\./g, '/')
  app.base = `/${path}`
  require(`${TEST_BASE}/server/${path}`)
}



global.client = {}
global.client.request = function(method, path, options, callback){
  if(typeof options === 'function'){
    callback = options
    options = {}
  }
  options.url = `http://127.0.0.1:8080/${clientBase}${path}`
  request[method](options, function(err, res, body){
    callback(res, body)
  })
}

global.client.get  = function(path, options, callback){ client.request('get',  path, options, callback) }
global.client.post = function(path, options, callback){ client.request('post', path, options, callback) }
global.client.put  = function(path, options, callback){ client.request('put',  path, options, callback) }
global.client.del  = function(path, options, callback){ client.request('del',  path, options, callback) }


let Server = Airdog.import('Server')
global.app = new Server

addService('Request.@basic')
addService('Request.@header')
addService('_middleware.Send.@basic')

app.listen(8080)


runSuite('Middleware.run')
runSuite('MiddlewareQueue.run')
runSuite('Route.parseRegExp')
runSuite('Route.match')
runSuite('RouteTable.match')
runSuite('Server.@basic')
runSuite('Delegator.@basic')
runSuite('Request.@basic')
runSuite('Request.@header')
runSuite('Kit.@basic')
runSuite('_middleware.Send.@basic')