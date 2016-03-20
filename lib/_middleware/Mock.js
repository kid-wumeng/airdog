"use strict"


exports.init = function(){
  if( !this.config['dir'] )
    if( this.app.mock && this.app.mock['dir'] )
      this.config['dir'] = this.app.mock['dir']
}


exports.mid = async function(){
  let debug = this.app['debug']
  if(!debug)
    await this.next
  else {
    let local = this.config.dir + this.path
    let exist = await this.isFile(local)
    if( exist ){
      let api = require(local)
      let data = api.data
      this.body = data
    } else {
      this.body = null
    }
  }
}