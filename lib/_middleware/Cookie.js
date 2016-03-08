"use strict"
const Kit = require('../Kit')


exports.mid = async function()
{
  let reqCookie = {}
  let resCookie = {}


  // this.cookie ( lazy-load )
  Object.defineProperty(this, 'cookie', {
    get(){
      let empty = Kit.isEmptyObject(reqCookie)
      if( empty )
        reqCookie = parse.call(this)
      return reqCookie
    }
  })
  
  
  this.setCookie = function(name, value, op){
    op = handleOption(op)
    let cookie = combine(name, value, op)
    resCookie[name] = cookie
  }
  

  this.removeCookie = function(name){
    if(name){
      // remove one
      let op = { maxAge: -100000 }
      let cookie = combine(name, '', op)
      resCookie[name] = cookie
    } else {
      // remove all
      resCookie = {}
      for(let name in this.cookie){
        this.removeCookie(name)
      }
    }
  }


  await this.next
  
  
  setHeader.call(this, resCookie)
}



function parse(){
  let cookies = this.get('cookie')
  if(!cookies)
    return {}
  
  cookies = cookies.split(/\s*;\s*/)
  let result = {}
  let name, value

  cookies.forEach(function(cookie){
    cookie = cookie.split('=')
    name  = unescape(cookie[0])
    value = unescape(cookie[1])
    result[name] = value
  })
  
  return result
}



function handleOption(op){
  switch(typeof op){
    case 'undefined': return {}
    case 'number':    return { maxAge: op }
  }
  return op
}



function combine(name, value, op){
  let buffer = [name, '=', value, ';']
  
  if(op.expires)
    append('expires', op.expires.toUTCString(), buffer)

  if(op.maxAge)
    append('max-age', op.maxAge, buffer)
    
  if(op.path)
    append('path', op.path, buffer)
    
  if(op.domain)
    append('domain', op.domain, buffer)
    
  if(op.secure)
    append('secure', null, buffer)
    
  if(op.httpOnly)
    append('httpOnly', null, buffer)
    
  return buffer.join('')
}



function append(name, value, buffer){
  value === null ?
    buffer.push(' ', name, ';')
  : buffer.push(' ', name, '=', value, ';')
}



/**
* @this { Context }
*/
function setHeader(resCookie){
  // Object -> Array
  let cookies = []
  for(let name in resCookie){
    var cookie = resCookie[name]
    cookies.push(cookie)
  }
  
  if(cookies.length)
    this.set('Set-Cookie', cookies)
}