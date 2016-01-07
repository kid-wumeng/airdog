import toolkit from './toolkit'
import Request from './Request'
import response from './response'


class Context {
  constructor( req, res )
  {
    this.raw = {}
    this.raw.req = req
    this.raw.res = res
    
    this.req = new Request(req, res)
    
    // Add shortcut-properties from the Request
    toolkit.delegate(this, this.req)
      .getter('verb')
      .getter('method')
      .getter('url')
      .getter('protocol')
      .getter('host')
      .getter('hostname')
      .getter('port')
      .getter('path')
      .getter('querystring')
      .getter('length')
      .method('get')
  }
}
  

module.exports = Context