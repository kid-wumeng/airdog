'use strict'


/**
* To combine a queue includes all middlewares
* into a callback
* that is the param of http.createServer(callback)
*
* @param midQue {array} - [m1, m2, ...]
* @return callback {function}
*/

export function combine(midQue){
  midQue.push(noop)
  let i = 0
  
  async function next(){
    await midQue[i++].call(this, next.bind(this))
  }
  return next
}

  
  

function noop(){}