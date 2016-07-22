const http = require('http')
const koa = require('koa')
const router = require('koa-router')
const render = require('koa-ejs')

export default class HTTP {

  constructor(){
    this.app = koa()
    this.router = router()
    this.server = null

    render(this.app, {
      root: `${CWD}/build`,
      layout: false,
      viewExt: 'html',
      cache: false,
      debug: true
    })
  }

  get(path, mid){
    this.router.get(path, mid)
  }

  ready(){
    this.app.use(require('koa-static')(`${CWD}/build`))
    this.app.use(this.router.routes())
    this.server = http.createServer(this.app.callback())
  }

  listen(port){
    this.server.listen(port)
  }

}