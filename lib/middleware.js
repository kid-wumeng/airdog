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

function Call( mids, ctx ){
  // As the end in recursion
  // now: [send, m1, m2, ..., noop]
  function noop(){}
  mids.push({ fn: noop })
  
  let i = 0
  let isEnd = false
  Object.defineProperty(ctx, 'next', {
    async get(){
      if(!isEnd){
        let { fn, params } = mids[i++]
        await fn.apply(ctx, params)
      }
    },
    // this.next is read-only
    set(){},
    configurable: false
  })
  
  Object.defineProperty(ctx, 'end', {
    async get(){
      isEnd = true
    },
    // this.next is read-only
    set(){},
    configurable: false
  })

  // Start
  ctx.next
}