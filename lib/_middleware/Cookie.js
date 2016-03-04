"use strict"

module.exports = async function()
{
  var _reqCookie = null  // { Object }
  var resCookie = {}    // { Object }


  // this.cookie ( lazy-load )
  Object.defineProperty(this, 'cookie', {
    get(){
      if(!_reqCookie)
        _reqCookie = parse.call(this)
      return _reqCookie
    }
  })
  
  
  this.setCookie = function(name, value, op){
    setCookie.call(this, name, value, op, resCookie)
  }
  
  
  this.removeCookie = function(name){
    removeCookie.call(this, name, resCookie)
  }
  
  
  await this.next
  
  
  setHeader.call(this, resCookie)
}



function parse(){
  let cookies = this.get('cookie')
  let result = {}
  let name, value
  
  cookies = cookies.split(/\s*;\s*/)
  cookies.forEach(function(cookie){
    cookie = cookie.split('=')
    name  = unescape(cookie[0])
    value = unescape(cookie[1])
    result[name] = value
  })
  
  return result
}



function setCookie(name, value, op, resCookie){
  op = handleOption(op)
  let cookie = combine(name, value, op)
  resCookie[name] = cookie
}



function removeCookie(name, resCookie){
  if(name){
    let op = { maxAge: -100000 }
    let cookie = combine(name, '', op)
    resCookie[name] = cookie
  } else {
    // remove all cookies
    for(name in this.cookie)
      removeCookie.call(this, name, resCookie)
  }
}



function combine(name, value, op){
  let buffer = [name, '=', value, ';']
  
  if(op.maxAge){
    let now = new Date()
    let time = now.getTime() + op.maxAge
    let date = new Date(time)
    append('expires', date.toUTCString(), buffer)
  }
  if(op.expires)
    append('expires', op.expires.toUTCString(), buffer)
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



function handleOption(op){
  switch(typeof op){
    case 'undefined': return {}
    case 'number':    return { maxAge: op }
  }
  return op
}



function append(name, value, buffer){
  value === null ?
    buffer.push(' ', name, ';')
  : buffer.push(' ', name, '=', value, ';')
}



function setHeader(resCookie){
  // Object -> Array
  let name, cookie, cookies = []
  for(name in resCookie){
    cookie = resCookie[name]
    cookies.push(cookie)
  }
  
  if(cookies.length)
    this.set('Set-Cookie', cookies)
}