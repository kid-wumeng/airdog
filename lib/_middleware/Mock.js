"use strict"


exports.init = function(){
  if( !this.config['dir'] )
    if( this.app.mock && this.app.mock['dir'] )
      this.config['dir'] = this.app.mock['dir']
}


exports.mid = async function(){
  if(this.app['debug']){
    this.config['dir'] ?
      await loadMock.call(this)
    : this.body = null
  } else {
    await this.next
  }
}


async function loadMock(){
  let local = this.config['dir'] + this.path
  let exist = await this.isFile(local)
  if( exist ){
    let api = require(local)
    let data = api.data
    this.body = data
  } else {
    this.body = null
  }
}