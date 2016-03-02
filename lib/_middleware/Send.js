import Stream from 'stream'


module.exports = async function()
{
  await this.next
  
  let body = this.body
  
  switch(true)
  {
    case typeof body === 'string':
    case body instanceof Buffer:           return sendString.call(this)
    case body instanceof Stream.Readable:  return sendStream.call(this)
    case body === undefined:
    case body === null:                    return send404.call(this)
    case body instanceof Object:           return sendObject.call(this)
    default:                               return sendOthers.call(this)
  }
}


function sendString(){
  send.call(this, this.body, 'text/plain')
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
  send.call(this, body, 'application/json')
}


function sendOthers(){
  let body = this.body.toString()
  send.call(this, body, 'text/plain')
}



/**
* @param { String } body
* @param { String } defaultType
*/
function send(body, defaultType)
{
  // Set Content-Type
  let type = this.res.type
  this.res.type = type ? type : defaultType
  
  // Set Content-Length
  this.set('Content-Length', body.length)

  // Set status
  this.raw.res.writeHead(this.status)
  
  // Set body
  this.raw.res.end(body)
}