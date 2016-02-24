import Stream from 'stream'



module.exports = async function()
{
  this.data = {}
  this.file = {}
  
  await this.next
  
  // @mock
  let body = this.body
  
  switch(true)
  {
    case typeof body === 'string':
    case body instanceof Buffer:          return sendString.call(this)
    case body instanceof Stream.Readable: return sendStream.call(this)
    case body === null:
    case body === undefined:              return send404.call(this)
    case body instanceof Object:          return sendObject.call(this)
    default:                              return sendOthers.call(this)
  }
}


// @TODO change to this.status =


function sendString(){
  this.raw.res.writeHead(200)
  this.raw.res.end(this.body)
}


function sendStream(){
  this.body.pipe(this.raw.res)
}


function send404(){
  this.raw.res.writeHead(404)
  this.raw.res.end()
}


function sendObject(){
  this.raw.res.writeHead(200)
  this.raw.res.end(JSON.stringify(this.body))
}


function sendOthers(){
  this.raw.res.writeHead(200)
  this.raw.res.end(this.body.toString())
}