"use strict"
const request = require('request')


test('Render HTML', function(done){
  client.get('/render', function(res, body){
    body.should.equal('hi, kid')
    done()
  })
})


test('Render HTML ( no Data )', function(done){
  client.get('/render-no-data', function(res, body){
    body.should.equal('hi, {{name}}')
    done()
  })
})


test('Render HTML ( dir is Engine-Object )', function(done){
  let engine = {}
  engine.compile = function(tpl){
    return tpl
  }
  engine.render = function(tpl, data){
    return tpl.replace('*', data)
  }
  
  let app = new Airdog({
    'render': {
      'engine': engine,
      'dir': __dirname
    }
  })
  app.get('/', function(){
    this.render('_user/_account/login.html', 'kid')
  })
  app.listen(8081)
  
  request.get('http://127.0.0.1:8081', function(err, res, body){
    body.should.equal('hi, kid')
    done()
    app.close()
  })
})



// test('Render HTML', function(done){
//   client.get('/login', function(res, body){
//     body.should.equal('hi, kid')
//     done()
//   })
// })