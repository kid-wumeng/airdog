"use strict"


let LIB_BASE = __dirname


function Airdog(config){
  const Server = require('./Server')
  return new Server(config)
}



/**
* Get class base on the lib's path, for test
* @private
* @param  { String } classname ( includes the namespace, e.g `a.b.Class` )
* @return { * } Class
*/
Airdog.import = function(classname){
  classname = classname.replace(/\./g, '/')
  // @TODO catch error
  return require(`${LIB_BASE}/${classname}`)
}



// The built-in middlewares
Airdog.Core = Airdog.import('_middleware.Core')
Airdog.Send = Airdog.import('_middleware.Send')
Airdog.FS = Airdog.import('_middleware.FS')
Airdog.Static = Airdog.import('_middleware.Static')
Airdog.Cookie = Airdog.import('_middleware.Cookie')
Airdog.Session = Airdog.import('_middleware.Session')
Airdog.BodyParser = {}
Airdog.BodyParser.Form = Airdog.import('_middleware.BodyParser.Form')
Airdog.BodyParser.JSON = Airdog.import('_middleware.BodyParser.JSON')
Airdog.BodyParser.File = Airdog.import('_middleware.BodyParser.File')
Airdog.Render = Airdog.import('_middleware.Render')

// The built-out middlewares
Airdog.CORS = Airdog.import('_middleware.CORS')



module.exports = Airdog