let Server = Airdog.import('Server')


test('Close Server', function(done)
{
  let flag = new Flag(1)
  let server = new Server()
  
  server.get('/', function(){
    flag.mark()
  })
  server.listen(8081)
  
  server.close(function(){
    flag.mark(1)
  })
  
  let request = require('request')
  request.get('http://127.0.0.1:8081', function(err, res, body){
    flag.assert()
    done()
  })
})