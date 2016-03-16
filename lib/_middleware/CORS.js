"use strict"


exports.mid = async function()
{
  setAllowOrigin.call(this)
  
  await this.next
}


function setAllowOrigin(){
  let allow = this.config['allow-origin']

  if(!allow)
    allow = null
  
  if(allow.constructor === String)
    if(allow !== '*')
      allow = [allow]

  if(allow.constructor === Array){
    let origin = this.get('Origin')
    allow.includes(origin) ?
      allow = origin
    : allow = null
  }

  this.set('Access-Control-Allow-Origin', allow)
}