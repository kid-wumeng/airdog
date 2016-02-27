let request = require('request')

test('Get HTML', function(done){
  request.get('http://127.0.0.1:8080/_test.html', function(err, res, body){
    console.log(res.headers['Content-Length']);
    body.should.equal('<!DOCTYPE html>')
    done()
  })
})