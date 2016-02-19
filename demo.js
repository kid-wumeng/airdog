import Airdog from './lib/Airdog'
import request from 'request'
import fs from 'fs'
import https from 'https'
let Server = Airdog.import('Server')

let s = new Server()

s.get('/', function(){
  console.log('yoyoyo')
  this.body = 'yoyoyo'
})

s.listen(8080)