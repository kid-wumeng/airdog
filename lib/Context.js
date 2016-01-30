import toolkit from './toolkit'
import fs from './async-await-fs'
import Request from './Request'
import Response from './Response'
import middleware from './middleware'


class Context {
  constructor(app, req, res, reqData )
  {
    this.app = app
    this.raw = {}
    this.raw.req = req
    this.raw.res = res
    this.raw.reqData = reqData
    
    this.req = new Request(req, res, reqData)
    this.res = new Response(req, res, reqData)
    
    this.fs = fs
    
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
      .setter('type')
      .access('status')
      .method('set')
      .method('render')
  }
  
  
  async read( path, encoding ){
    encoding = encoding || undefined
    try {
      return await this.fs.readFile( path, encoding )
    } catch(e) {
      return null
    }
  }
  
}
  

module.exports = Context