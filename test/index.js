"use strict"

require('chai').should()

let mocha = require('mocha')
const TEST_BASE = __dirname


global.request = require('request')
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
  options.method = method
  options.url = `http://127.0.0.1:8080/${clientBase}${path}`
  request(options, function(err, res, body){
    callback(res, body)
  })
}

global.client.get  = function(path, options, callback){ client.request('GET',  path, options, callback) }
global.client.post = function(path, options, callback){ client.request('POST', path, options, callback) }
global.client.put  = function(path, options, callback){ client.request('PUT',  path, options, callback) }
global.client.del  = function(path, options, callback){ client.request('DELETE',  path, options, callback) }
global.client.options = function(path, options, callback){ client.request('OPTIONS',  path, options, callback) }


let Server = Airdog.import('Server')
global.app = new Server({
  'static': {
    'dir': `${__dirname}/server/_middleware/Static/`
  },
  'render': {
    'dir': `${__dirname}/server/_middleware/Render/_views`
  }
})


addService('Request')
addService('Request.get')
addService('Response')
addService('Response.set')
addService('_middleware.FS')
addService('_middleware.Send')
addService('_middleware.Cookie')
addService('_middleware.Session')
addService('_middleware.BodyParser.Form')
addService('_middleware.BodyParser.JSON')
addService('_middleware.BodyParser.File')
addService('_middleware.Render')

addService('_middleware.CORS')


app.listen(8080)


runSuite('Airdog')
runSuite('Middleware.run')
runSuite('MiddlewareQueue.run')
runSuite('Route.parseRegExp')
runSuite('Route.match')
runSuite('RouteTable.match')
runSuite('Server')
runSuite('Event')
runSuite('Delegator')
runSuite('Request')
runSuite('Request.get')
runSuite('Response')
runSuite('Response.set')
runSuite('Kit')
runSuite('_middleware.Send')
runSuite('_middleware.FS')
runSuite('_middleware.Static')
runSuite('_middleware.Cookie')
runSuite('_middleware.Session')
runSuite('_middleware.BodyParser.Form')
runSuite('_middleware.BodyParser.JSON')
runSuite('_middleware.BodyParser.File')
runSuite('_middleware.Render')

runSuite('_middleware.CORS')
runSuite('_middleware.Mock')