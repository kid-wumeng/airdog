"use strict"

module.exports = async function()
{
  var _reqCookie = null  // { Object }
  var _resCookie = []    // { Array<String> }

  // this.cookie ( lazy-load )
  Object.defineProperty(this, 'cookie', {
    get(){
      if(!_reqCookie)
        _reqCookie = parse.call(this)
      return _reqCookie
    }
  })
  
  // this.setCookie
  this.setCookie = setCookie.bind(_resCookie)
  
  await this.next
  
  if(_resCookie.length)
    this.set('Set-Cookie', _resCookie)
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



function setCookie(name, value, op){
  op = handleOption(op)
  let cookie = combine(name, value, op)
  this.push(cookie)
}



function combine(name, value, op){
  let buffer = [name, '=', value]
  
  if(op.maxAge){
    let now = new Date()
    let time = now.getTime() + op.maxAge
    append('max-age', new Date(time), buffer)
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
  if(typeof op === 'undefined')
    op = {}
  if(typeof op === 'number')
    op = { maxAge: op }
  return op
}



function append(name, value, buffer){
  value === null ?
    buffer.push(' ', name, ';')
  : buffer.push(' ', name, '=', value, ';')
}