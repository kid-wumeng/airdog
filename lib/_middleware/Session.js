"use strict"


let Airdog = require('../Airdog')
let Kit = require('../Kit')


exports.appCreate = function(){
  this.app.sessionStore = new SessionStore(this.app)
}


exports.appClose = function(){
  this.app.sessionStore.stopInspect()
}


exports.mid = async function(){
  let session = this.app.sessionStore.get(this)
  this.session = session.data
  
  this.removeSession = function(name){
    this.session = session.remove(name)
  }

  await this.next
}





function SessionStore(app){
  this.app = app
  this.store = {}
  
  // default option
  this.op = Kit.merge({
    'max-age': 30 * 60 * 1000,
    'inspect-time': 30 * 60 * 10000
  }, app.session)
  
  this.timer = setInterval(this.inspect.bind(this), this.op['inspect-time'])
}


SessionStore.prototype.inspect = function(){
  let name, session
  for(name in this.store){
    session = this.store[name]
    if(session.isTimeout(this.op['max-age']))
      delete this.store[name]
  }
}


SessionStore.prototype.stopInspect = function(){
  clearInterval(this.timer)
}


/**
* Get the has-existed session or create a new session
* @param  { Context }
* @return { Session }
*/
SessionStore.prototype.get = function(ctx){
  let sid = ctx.cookie['Session-ID']
  if( sid && this.store[sid] ){
    let session = this.store[sid]
    session.flushTime()
    return session
  } else {
    return this.create(ctx)
  }
}


/**
* @param  { Context }
* @return { Session }
*/
SessionStore.prototype.create = function(ctx){
  let sid = this.makeSID()
  let session = new Session()
  this.store[sid] = session
  ctx.setCookie('Session-ID', sid)
  return session
}


/**
* @return { String }
*/
SessionStore.prototype.makeSID = function(){
  let date = new Date().getTime()
  let random = Math.random()
  return `${date}-${random}`
}




function Session(){
  this.time = new Date().getTime()
  this.data = {}
}

Session.prototype.isTimeout = function(maxAge){
  let now = new Date().getTime()
  return now - this.time >= maxAge
}

Session.prototype.flushTime = function(){
  this.time = new Date().getTime()
}

/**
* @return { Object } - the session-data after removed
*/
Session.prototype.remove = function(name){
  name ? delete this.data[name] : this.data = {}
  return this.data
}