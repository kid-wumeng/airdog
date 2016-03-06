"use strict"


let store = {}


module.exports = async function(){
  this.session = getSession.call(this).map

  await this.next
}


/**
* Get session
* Create new session if cookie or store has not exist Session-ID
* @return { Session }
*/
function getSession(){
  let id = this.cookie['Session-ID']
  if( id && store[id] ){
    let session = store[id]
    session.flushTime()
    return session
  }
  return createSession.call(this)
}



/**
* @return { Session }
*/
function createSession(){
  let session = new Session()
  store[session.id] = session
  this.setCookie('Session-ID', session.id)
  return session
}





function Session(){
  this.id = this.makeId()
  this.timeout = null
  this.map = {}
  
  this.flushTime()
}


Session.MAX_AGE = 30 * 60 * 1000  // 30 minutes


Session.prototype.makeId = function(name){
  let date = new Date().getTime()
  let random = Math.random()
  return `${date}-${random}`
}


Session.prototype.flushTime = function(name){
  clearTimeout(this.timeout)
  this.timeout = setTimeout(this.destroy.bind(this), Session.MAX_AGE)
}


Session.prototype.destroy = function(){
  delete store[this.id]
}


Session.prototype.get = function(name){
  return this.map[name]
}


Session.prototype.set = function(name, value){
  this.map[name] = value
}


Session.prototype.remove = function(name){
  delete this.map[name]
}


Session.prototype.removeAll = function(name){
  delete this.map
  this.map = {}
}