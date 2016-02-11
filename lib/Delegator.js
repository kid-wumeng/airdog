/**
* @param { Object } dest
* @param { Object } src
* @TODO handle the error when no-getter or no-setter
*/
function Delegator(dest, src)
{
  this.dest = dest
  this.src = src
}



/**
* @param  { String } name - the method name of src
* @return { Delegator } this
*/
Delegator.prototype.method = function(name)
{
  let dest = this.dest
  let src = this.src
  dest[name] = function(){
    return src[name].apply(dest, arguments)
  }
  return this
}



/**
* @param  { String } name - the getter name of src
* @return { Delegator } this
*/
Delegator.prototype.getter = function(name)
{
  let dest = this.dest
  let src  = this.src
  Object.defineProperty(dest, name, {
    get(){ return src[name] }
  })
  return this
}



/**
* @param  { String } name - the setter name of src
* @return { Delegator } this
*/
Delegator.prototype.setter = function(name)
{
  let dest = this.dest
  let src  = this.src
  Object.defineProperty(dest, name, {
    set( value ){ src[name] = value }
  })
  return this
}



/**
* @param  { String } name - the access name of src
* @return { Delegator } this
*/
Delegator.prototype.access = function(name)
{
  let dest = this.dest
  let src  = this.src
  Object.defineProperty(dest, name, {
    get(){ return src[name] },
    set( value ){ src[name] = value }
  })
  return this
}



module.exports = Delegator