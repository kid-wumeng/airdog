import Kit from './Kit'



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
* @param  { String } name - the getter name of src
* @return { Delegator } this
*/
Delegator.prototype.getter = function(name){
  let src = this.src
  this.describe(name, {
    get(){ return src[name] }
  })
  return this
}



/**
* @param  { String } name - the setter name of src
* @return { Delegator } this
*/
Delegator.prototype.setter = function(name){
  let src = this.src
  this.describe(name, {
    set( value ){ src[name] = value }
  })
  return this
}



/**
* @param  { String } name - the access name of src
* @return { Delegator } this
*/
Delegator.prototype.access = function(name){
  let src = this.src
  this.describe(name, {
    get(){ return src[name] },
    set( value ){ src[name] = value }
  })
  return this
}



/**
* @param  { String } name - the method name of src
* @return { Delegator } this
*/
Delegator.prototype.method = function(name){
  let dest = this.dest
  let src = this.src
  dest[name] = function(){
    return src[name].apply(dest, arguments)
  }
  return this
}



// For example, AsyncAwaitFS
Delegator.prototype.async_await = function(name){
  let dest = this.dest
  let src  = this.src
  dest[name] = async function(){
    let args = [].slice.call(arguments)
    return new Promise(function(resolve, reject){
      let callback = function(err, res){
        err ? reject(err) : resolve(res)
      }
      args.push(callback)
      src[name].apply(null, args)
    })
  }
  return this
}



Delegator.prototype.describe = function(name, new_desc){
  let desc = Object.getOwnPropertyDescriptor(this.dest, name)
  if(!desc)
    desc = {}
    
  Kit.merge(desc, new_desc)
  desc.configurable = true
  
  Object.defineProperty(this.dest, name, desc)
  return this
}



module.exports = Delegator