import Request from './Request'


class Context extends Request {
  constructor( req, res ){
    super()
    this.raw = {}
    this.raw.req = req
    this.raw.res = res
  }
}


module.exports = Context