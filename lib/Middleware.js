"use strict"


/**
* @param! { Object | (Async) Function } mid - { mid: fn } or fn
*/
class Middleware {
  
  constructor(mid, config){
    super()
    
    if( mid instanceof Function ){
      mid = { mid: mid }
    }
    
    this.mid = mid.mid
    this.config = config || {}
    this.params = null
    
    this.appCreate = mid.appCreate
    this.appClose = mid.appClose
    this.useMid = mid.useMid
  }
  
}


/**
* As the end in recursion
*/
Middleware.NOOP_MID = new Middleware(function(){})


/**
* @param! { context } ctx
*/
Middleware.prototype.run = async function(ctx){
  ctx.config = this.config
  await this.mid.apply(ctx, this.params)
}



module.exports = Middleware