"use strict"
class Kit {}


Kit.merge = function(dest, src){
  for( let key in src )
    dest[key] = src[key]
  return dest
}


Kit.isEmptyObject = function(obj){
  let name
  for(name in obj)
    return false
  return true
}


Kit.formatPath = function(path){
  return path.replace(/\/{2,}/g, '/')
}


module.exports = Kit