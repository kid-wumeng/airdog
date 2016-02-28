import Stream from 'stream'



module.exports = async function()
{
  await this.next
  
  let body = this.body
  
  switch(true)
  {
    case typeof body === 'string':
    case body instanceof Buffer:          return sendString.call(this)
    case body instanceof Stream.Readable: return sendStream.call(this)
    case body === null:                   return send404.call(this)
    case body instanceof Object:          return sendObject.call(this)
    default:                              return sendOthers.call(this)
  }
}


function sendString(){
  this.set('Content-Type', 'text/plain')
  this.set('Content-Length', this.body.length)
  this.raw.res.writeHead(this.status)
  this.raw.res.end(this.body)
}


function sendStream(){
  this.raw.res.writeHead(this.status)
  this.body.pipe(this.raw.res)
}


function send404(){
  this.raw.res.writeHead(404)
  this.raw.res.end()
}


function sendObject(){
  let body = JSON.stringify(this.body)
  this.set('Content-Type', 'application/json')
  this.set('Content-Length', body.length)
  this.raw.res.writeHead(this.status)
  this.raw.res.end(body)
}


function sendOthers(){
  let body = this.body.toString()
  this.set('Content-Type', 'text/plain')
  this.set('Content-Length', body.length)
  this.raw.res.writeHead(this.status)
  this.raw.res.end(body)
}