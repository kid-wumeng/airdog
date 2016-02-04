/**
* @param! { Function | Async-Function } fn - the middleware function
* @param  { Array < String > } params - from the route-url ( e.q `/user/:id/:book` )
*/
class Middleware {
  constructor(fn, params){
    this.fn = fn          // Function | Async-Function
    this.params = params  // Array < String >
  }
}



/**
* As the end in recursion
*/
Middleware.NOOP_MID = new Middleware( function(){} )



/**
* @param! { context } ctx
*/
Middleware.prototype.run = async function(ctx){
  await this.fn.apply(ctx, this.params)
}



module.exports = Middleware