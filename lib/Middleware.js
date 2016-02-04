/**
* @class
* @param { Function | Async-Function } fn - The middleware function
*/
class Middleware {
  constructor(fn){
    this.fn = fn
  }
}



/**
* @param { context } ctx
* @param { Array < String > } params
*/
Middleware.prototype.run = function(ctx, params){
  this.fn.apply(ctx, params)
}



module.exports = Middleware