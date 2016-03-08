"use strict"

/**
* @param! { Object | (Async) Function } mid - { mid: fn } or fn
*/
function Middleware(mid){
  if(mid instanceof Function){
    mid = { mid: mid }
  }
  
  this.mid = mid.mid
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
  await this.mid.apply(ctx, this.params)
}



module.exports = Middleware