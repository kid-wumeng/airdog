import Request from './Request'
import Delegator from './Delegator'



function Context(app, raw){
  this.app = app
  this.raw = raw
  this.req = new Request(this.app, this.raw)

  new Delegator(this, this.req)
    .getter('method')
    .getter('host')
    .method('get')
}



module.exports = Context