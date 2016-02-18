function Kit(dest, src)
{
  this.dest = dest
  this.src = src
}



Kit.merge = function(dest, src){
  for( let key in src ){
    dest[key] = src[key]
  }
  return dest
}



module.exports = Kit