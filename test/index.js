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
  global.clientBase = path
  suite(module, function(){
    require(`${TEST_BASE}/suite/${path}`)
  })
}



global.addService = function(module){
  let path = module.replace(/\./g, '/')
  server.setBase(`/${path}`)
  require(`${TEST_BASE}/server/${path}`)
}





global.client = {}
global.client.request = function(method, path, callback){
  let url = `http://localhost:8080/${clientBase}${path}`
  request[method](url, function(err, res, body){
    callback(res, body)
  })
}

global.client.get  = function(path, callback){ client.request('get' , path, callback) }
global.client.post = function(path, callback){ client.request('post', path, callback) }
global.client.put  = function(path, callback){ client.request('put',  path, callback) }
global.client.del  = function(path, callback){ client.request('del',  path, callback) }


let Server = Airdog.import('Server')
global.server = new Server

addService('Request.method')

server.listen(8080)



runSuite('Middleware.run')
runSuite('MiddlewareQueue.run')
runSuite('Route.parseRegExp')
runSuite('Route.match')
runSuite('RouteTable.match')
runSuite('Delegator.method')
runSuite('Delegator.getter')
runSuite('Delegator.setter')
runSuite('Delegator.access')
runSuite('Server.#body')
runSuite('Request.method')