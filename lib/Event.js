"use strict"


class Event {
  constructor(){
    this.event = {}
  }
}


Event.prototype.on = function(name, handle){
  if(typeof handle === 'function'){
    if(!this.event[name])
      this.event[name] = []
    this.event[name].push(handle)
  }
  return this
}


Event.prototype.emit = function(name, thisObj){
  if(this.event[name]){
    let params = [].slice.call(arguments, 2)
    let events = this.event[name]
    events.forEach(function(handle){
      handle.apply(thisObj, params)
    })
  }
  return this
}


module.exports = Event