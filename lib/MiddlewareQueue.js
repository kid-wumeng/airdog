import Middleware from './Middleware'



class MiddlewareQueue {
  constructor(){
    this.mids = []  // Array < Middleware >
    this.ctx = {}   // Context
  }
}



/**
* @param! { Function | Async-Function } fn
* @param  { Array < String > } params
*/
MiddlewareQueue.prototype.add = function(fn, params){
  this.mids.push(new Middleware(fn, params))
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
  let i = 0, { mids, ctx } = this
  Object.defineProperty(ctx, 'next', {
    configurable: false,
    async get(){
      await mids[i++].run(ctx)
    }
  })
}



module.exports = MiddlewareQueue