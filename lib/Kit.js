"use strict"
class Kit {}


Kit.merge = function(dest, src){
  for( let key in src )
    dest[key] = src[key]
  return dest
}


Kit.isEmptyObject = function(obj){
  for(var name in obj)
    return false
  return true
}


module.exports = Kit