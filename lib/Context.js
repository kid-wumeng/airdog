import Request from './Request'
import Delegator from './Delegator'



function Context(app, raw){
  this.app = app
  this.raw = raw
  this.req = new Request(this.app, this.raw)

  new Delegator(this, this.req)
    .getter('method')
    .getter('url')
    .getter('protocol')
    .getter('host')
    .getter('hostname')
    .method('get')
}



module.exports = Context