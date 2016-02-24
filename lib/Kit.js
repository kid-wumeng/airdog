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



/**
* For example, keyValues = 'k1=v1; k2; k3=v3'
* result => { k1: v1, k2: true, k3: v3 }
* @param  { String } keyValues
* @return { Object } obj
*/
Kit.parseKeyValues = function(keyValues){
  const SEP_REGEXP = /\s*;\s*/
  let key, value, obj = {}
  keyValues = keyValues.split(SEP_REGEXP)
  keyValues.forEach(function(keyValue){
    [ key, value ] = keyValue.split('=')
    if(value)
      obj[key] = Kit.parseValue(value)
    else
      obj[key] = true
  })
  return obj
}



Kit.parseValue = function(value){
  const NUMBER = /^\d+(?:\.\d+)?$/
  const BOOLEAN = /^(?:true|false)$/
  switch(true){
    case NUMBER.test(value):  return parseFloat(value)
    // @REVIEW new Boolean ?
    case BOOLEAN.test(value): return value === 'true'
  }
  return value
}



module.exports = Kit