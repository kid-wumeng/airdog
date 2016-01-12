import toolkit from './toolkit'
import Request from './Request'
import Response from './Response'


class Context {
  constructor( req, res, reqData )
  {    
    this.raw = {}
    this.raw.req = req
    this.raw.res = res
    this.raw.reqData = reqData
    
    this.req = new Request(req, res, reqData)
    this.res = new Response(req, res, reqData)
    
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
      
    toolkit.delegate(this, this.res)
      .access('status')
      .method('set')
  }
}
  

module.exports = Context