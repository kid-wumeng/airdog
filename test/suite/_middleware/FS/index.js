"use strict"


test('Read File', function(done){
  client.get('/read', function(res, body){
    body.should.equal('hi, kid')
    done()
  })
})



test('Write File', function(done){
  let date = new Date().getTime()
  let headers = { 'Test-Data': date }
  let options = { headers: headers }
  client.get('/write', options, function(res, body){
    body.should.equal(date.toString())
    done()
  })
})



test('Is File', function(done){
  client.get('/isFile', function(res, body){
    body.should.equal('true')
    done()
  })
})



test('Is File ( no exist )', function(done){
  client.get('/isFile-noExist', function(res, body){
    body.should.equal('false')
    done()
  })
})



test('Is Dir', function(done){
  client.get('/isDir', function(res, body){
    body.should.equal('true')
    done()
  })
})



test('Is Dir ( no exist )', function(done){
  client.get('/isDir-noExist', function(res, body){
    body.should.equal('false')
    done()
  })
})