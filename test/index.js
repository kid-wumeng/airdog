require('babel-polyfill')
require('chai').should()

let mocha = require('mocha')
let request = require('request')
const TEST_BASE = __dirname

global.suite = mocha.suite
global.test = mocha.test
global.Airdog = require('../lib/Airdog')
global.util = require('./asset/util')
global.Flag = util.Flag

global.runSuite = function(module){
  suite(module, function(){
    module = module.replace(/\./g, '/')
    require(`${TEST_BASE}/suite/${module}`)
  })
}



global.client = {}
global.client.request = function(method, path, callback){
  let url = `http://localhost:8080${path}`
  request[method](url, function(err, res, body){
    callback(res, body)
  })
}

global.client.get  = function(path, callback){ client.request('get' , path, callback) }
global.client.post = function(path, callback){ client.request('post', path, callback) }
global.client.put  = function(path, callback){ client.request('put',  path, callback) }
global.client.del  = function(path, callback){ client.request('del',  path, callback) }



runSuite('Middleware.run')
runSuite('MiddlewareQueue.run')
runSuite('Route.parseRegExp')
runSuite('Route.match')
runSuite('RouteTable.match')
runSuite('Delegator.method')
runSuite('Delegator.getter')
runSuite('Delegator.setter')
runSuite('Delegator.access')
runSuite('Server.#method')
runSuite('Server.#body')
