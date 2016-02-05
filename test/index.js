require('babel-polyfill')
// require('./server')
require('chai').should()

let mocha = require('mocha')
const TEST_BASE = __dirname

global.suite = mocha.suite
global.test = mocha.test
global.request = require('request')
global.Airdog = require('../lib/Airdog')
global.util = require('./asset/util')
global.Flag = util.Flag

global.runSuite = function(module){
  suite(module, function(){
    module = module.replace(/\./g, '/')
    require(`${TEST_BASE}/suite/${module}`)
  })
}

runSuite('Middleware.run')
runSuite('MiddlewareQueue.run')
runSuite('Route.parseRegExp')
runSuite('Route.match')