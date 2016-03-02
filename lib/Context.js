"use strict"
const Request = require('./Request')
const Response = require('./Response')
const Delegator = require('./Delegator')


function Context(app, raw){
  this.app = app
  this.raw = raw
  this.req = new Request(this.app, this.raw)
  this.res = new Response(this.app, this.raw)
  
  new Delegator(this, this.req)
    .getter('method')
    .getter('url')
    .getter('protocol')
    .getter('host')
    .getter('hostname')
    .getter('port')
    .getter('path')
    .getter('type')
    .method('get')
    
  new Delegator(this, this.res)
    .setter('type')
    .access('body')
    .access('status')
    .method('set')
}


module.exports = Context