let LIB_BASE = __dirname


class Airdog {}



/**
* @private
* @param  { String } classname ( includes the namespace, e.g `a.b.Class` )
* @return { * } Class
*/

Airdog.import = function(classname){
  classname = classname.replace(/\./g, '/')
  // @TODO catch error
  return require(`${LIB_BASE}/${classname}`)
}



module.exports = Airdog