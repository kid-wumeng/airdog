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



Airdog.Send = Airdog.import('_middleware.Send')
Airdog.BodyParser = Airdog.import('_middleware.BodyParser')



module.exports = Airdog