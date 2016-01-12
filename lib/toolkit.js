/**
 * Create a delegator to bind the dest-object and src-object.
 *
 * When use the method ( or getter / setter ) of dest
 * will invoke the same name method ( or getter / setter ) of src to execute real.
 *
 * @param  { Object } dest
 * @param  { Object } src
 * @return { Delegator }
 */

exports.delegate = function(dest, src){
  return new Delegator(dest, src)
}



function Delegator(dest, src){
  this.dest = dest
  this.src = src
}



Delegator.prototype.attr = function(name)
{
  this.dest[name] = this.src[name]
  return this
}



/**
 * Bind the getter
 * @param  { String } name - the getter name of src
 * @return { Delegator } this
 */
 
Delegator.prototype.getter = function(name)
{
  let dest = this.dest
  let src = this.src
  
  Object.defineProperty(dest, name, {
    get(){ return src[name] }
  })
  
  return this
}



/**
 * Bind the setter
 * @param  { String } name - the setter name of src
 * @return { Delegator } this
 */
 
Delegator.prototype.setter = function(name)
{
  let dest = this.dest
  let src = this.src

  Object.defineProperty(dest, name, {
    set( value ){ src[name] = value }
  })

  return this
}



/**
 * Bind the access ( both the getter and setter )
 * @param  { String } name - the access name of src
 * @return { Delegator } this
 */
 
Delegator.prototype.access = function(name)
{
  let dest = this.dest
  let src = this.src

  Object.defineProperty(dest, name, {
    get(){ return src[name] },
    set( value ){ src[name] = value }
  })

  return this
}



/**
 * Bind a method
 * @param { String } name - the method name of src
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