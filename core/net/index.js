import fs from 'fs'
import HTTP from './HTTP'
import WebSocket from './WebSocket'
import DSP from './DSP'

export function init(){
  let bundle = fs.readFileSync(`${RUNTIME_DIR}/build/bundle.js`)
  let http = new HTTP()
  http.get('/', function*(){
    yield this.render('index', {bundle})
  })
  http.ready()


  let webSocket = new WebSocket(http)
  let dsp = new DSP(webSocket)



  webSocket.ready()


  http.listen(3000)
  console.log('airdog start listen 3000');
}