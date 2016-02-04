Airdog.import('Middleware')


class MiddlewareQueue {
  constructor(){
    this.mids = []  // Array < Middleware >
  }
}


/**
* @param { Function | Async-Function } fn
*/
MiddlewareQueue.prototype.add = function(fn){
  this.mids.push(new Middleware(fn))
}

module.exports = MiddlewareQueue