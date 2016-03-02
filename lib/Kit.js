"use strict"
class Kit {}


Kit.merge = function(dest, src){
  for( let key in src )
    dest[key] = src[key]
  return dest
}


module.exports = Kit