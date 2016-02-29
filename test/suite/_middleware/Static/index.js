let fs = require('fs')
let http = require('http')
let zlib = require('zlib')
let request = require('request')



test('Get HTML', function(done){
  request.get('http://127.0.0.1:8080/_test.html', function(err, res, body){
    res.headers['content-type'].should.equal('text/html')
    res.headers.should.not.include.keys('content-encoding')
    body.should.equal('<!DOCTYPE html>')
    done()
  })
})



test('Get HTML ( gzip )', function(done){
  let headers = {'Accept-Encoding': 'gzip, deflate, lzma, sdch'}
  let options = { headers: headers, encoding: null }
  request.get('http://127.0.0.1:8080/_test.html', options, function(err, res, body){
    res.headers['content-type'].should.equal('text/html')
    res.headers['content-encoding'].should.equal('gzip')
    
    zlib.unzip(body, function(err, data){
      new String(data).should.equal('<!DOCTYPE html>')
      done()
    })
  })
})



test('Get HTML ( deflate )', function(done){
  let headers = {'Accept-Encoding': 'deflate, lzma, sdch'}
  let options = { headers: headers, encoding: null }
  request.get('http://127.0.0.1:8080/_test.html', options, function(err, res, body){
    res.headers['content-type'].should.equal('text/html')
    res.headers['content-encoding'].should.equal('deflate')
    
    zlib.unzip(body, function(err, data){
      new String(data).should.equal('<!DOCTYPE html>')
      done()
    })
  })
})



test('Get PNG ( unvalid-gzip )', function(done){
  let headers = {'Accept-Encoding': 'gzip, deflate, lzma, sdch'}
  let options = { headers: headers }
  request.get('http://127.0.0.1:8080/_test.png', options, function(err, res, body){
    res.headers['content-type'].should.equal('image/png')
    res.headers.should.not.include.keys('content-encoding')
    let image = fs.readFileSync(`${__dirname}/_test.png`, 'utf-8')
    body.should.equal(image)
    done()
  })
})