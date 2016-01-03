/**
 * Call all middlewares step by step
 * and use the params from :param ( captured in path )
 *
 * @param { Array } middlewares -
 *   For example, the struct like:
 *     [
 *       { fn: m1, params: [] },
 *       { fn: m2, params: [12] },
 *       { fn: m3, params: [12, 'kid'] },
 *     ]
 * @param { Context } ctx - Will add getter `this.next`.
 */

exports.Call = function( middlewares, ctx ){
  let i = 0
  let noop = { fn: function(){} }
  middlewares.push(noop)
  ctx.next = async function(){
    let fn = middlewares[i].fn
    let params = middlewares[i].params
    i++
    await fn.apply(ctx, params)
  }
  ctx.next()
}