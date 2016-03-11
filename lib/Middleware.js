"use strict"

/**
* @param! { Object | (Async) Function } mid - { mid: fn } or fn
*/
function Middleware(mid, config){
  if( mid instanceof Function ){
    mid = { mid: mid }
  }
  
  this.mid = mid.mid || async function(){ await this.next }
  this.config = config
  this.appCreate = mid.appCreate
  this.appClose = mid.appClose
  this.params = null
}


/**
* As the end in recursion
*/
Middleware.NOOP_MID = new Middleware(function(){})


/**
* @param! { context } ctx
*/
Middleware.prototype.run = async function(ctx){
  ctx.config = this.config || {}
  await this.mid.apply(ctx, this.params)
}



module.exports = Middleware