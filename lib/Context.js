import Request from './Request'
import Delegator from './Delegator'



function Context(req, res, data)
{
  this.raw = {}
  this.raw.req = req
  this.raw.res = res
  this.raw.data = data
  
  this.req = new Request(this.raw)
  
  new Delegator(this, this.req)
    .getter('method')
    .getter('host')
    .method('get')
}



module.exports = Context