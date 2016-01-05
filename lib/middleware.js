exports.Call = Call


/**
 * Call all middlewares step by step
 * and use the params from :param ( captured in path ).
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

function Call( middlewares, ctx ){
  // As the end in recursion
  function noop(){}
  middlewares.push({ fn: noop })
  
  let i = 0
  Object.defineProperty(ctx, 'next', {
    async get(){
      let { fn, params } = middlewares[i++]
      await fn.apply(ctx, params)
    },
    // this.next is read-only
    set(){},
    configurable: false
  })

  // Start
  ctx.next
}