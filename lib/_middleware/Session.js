"use strict"


let Airdog = require('../Airdog')


let store = {}


exports.appCreate = function(){
  
}


exports.mid = async function(){
  let session = getSession.call(this)
  this.session = session.data
  
  this.removeSession = function(name){
    if(name){
      delete this.session[name]
    } else {
      this.session = {}
      session.destroy()
    }
  }

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
  this.data = {}
  
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