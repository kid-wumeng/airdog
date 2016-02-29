let LIB_BASE = __dirname



class Airdog {}



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



Airdog.Core = Airdog.import('_middleware.Core')
Airdog.Send = Airdog.import('_middleware.Send')
Airdog.FS = Airdog.import('_middleware.FS')
Airdog.Static = Airdog.import('_middleware.Static')
Airdog.BodyParser = {}
Airdog.BodyParser.Form = Airdog.import('_middleware.BodyParser.Form')
Airdog.BodyParser.JSON = Airdog.import('_middleware.BodyParser.JSON')
Airdog.BodyParser.File = Airdog.import('_middleware.BodyParser.File')



module.exports = Airdog