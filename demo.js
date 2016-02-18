// import Airdog from './lib/Airdog'
// import request from 'request'
// let Server = Airdog.import('Server')
//
// let s = new Server({
//   https: true
// })
//
// s.get('/', function(){
//   console.log(this.protocol)
//   this.body = this.protocol
// })
//
// s.listen(8080)
//
// request.get('https://localhost:8080/', function(err, res, body){
//   s.close()
// })


// let fs = require('fs')
// var options = {
//   key: fs.readFileSync('./server-key.pem'),
//   cert: fs.readFileSync('./server-cert.pem')
// }
// let https = require('https')
// let request = require('request')
// let s = https.createServer(options, function(req, res){
//   console.log('yo!')
//   res.end('hgf')
// }).listen(443)


// request.get('https://127.0.0.1:8080', function(err){
//   console.log('fr');
//   console.log(err);
// })