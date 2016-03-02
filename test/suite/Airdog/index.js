import request from 'request'

test('Create Airdog', function(){
  let app = new Airdog()
  app.get('/', function(){
    this.body = 'ok'
  })
  app.listen(8081)
  
  request('http://127.0.0.1:8081', function(err, res, body){
    body.should.equal('ok')
    app.close()
  })
})