exports.delegate = function(dest, src){
  return new Delegate(dest, src)
}


function Delegate(dest, src){
  this.dest = dest
  this.src = src
}


Delegate.prototype.getter = function(name)
{
  let dest = this.dest
  let src = this.src
  Object.defineProperty(dest, name, {
    get(){ return src[name] }
  })
  return this
}