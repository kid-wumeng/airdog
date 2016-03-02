"use strict"
let Middleware = require('./Middleware')


/**
* @param { Array < Middleware > } mids
*/
function MiddlewareQueue(mids){
  this.mids = mids || []  // Array < Middleware >
  this.ctx = {}           // Context
}



/**
* @param! { Middleware } mid
*/
MiddlewareQueue.prototype.add = function(mid){
  this.mids.push(mid)
}



/**
* @param { Context } ctx
*/
MiddlewareQueue.prototype.run = function(ctx){
  this.ctx = ctx || {}
  this.bindNext()
  this.mids.push(Middleware.NOOP_MID)
  this.ctx.next  // Start run the first middleware
}



/**
* Bind this.next
* @private
*/
MiddlewareQueue.prototype.bindNext = function(){
  let mids = this.mids
  let ctx = this.ctx
  let i = 0
  Object.defineProperty(ctx, 'next', {
    configurable: false,
    async get(){
      await mids[i++].run(ctx)
    }
  })
}



module.exports = MiddlewareQueue