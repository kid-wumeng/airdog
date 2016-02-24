import FS from 'fs'


test('Parse Query', function(done){
  client.get('/data?name=kid&age=18', function(res, body){
    // @TODO support type-convert
    body.should.equal(JSON.stringify({
      name: 'kid',
      age: '18'
    }))
    done()
  })
})



test('Parse Form ( GET )', function(done){
  let form = { name: 'kid', age: 18 }
  let options = { form: form }
  client.get('/data', options, function(res, body){
    // @TODO support type-convert
    body.should.equal(JSON.stringify({
      name: 'kid',
      age: '18'
    }))
    done()
  })
})



test('Parse Form ( POST )', function(done){
  let form = { name: 'kid', age: 18 }
  let options = { form: form }
  client.post('/data', options, function(res, body){
    // @TODO support type-convert
    body.should.equal(JSON.stringify({
      name: 'kid',
      age: '18'
    }))
    done()
  })
})



test('Parse JSON ( GET )', function(done){
  let json = { name: 'kid', age: 18 }
  let options = { json: json }
  client.get('/data', options, function(res, body){
    // @TODO support type-convert
    body.should.eql({
      name: 'kid',
      age: 18
    })
    done()
  })
})



test('Parse File', function(done)
{
  let fileA = {}
  fileA.value = FS.createReadStream(__dirname + '/_fileA.txt')
  fileA.options = {}
  
  let fileB1 = {}
  fileB1.value = FS.createReadStream(__dirname + '/_fileB1.txt')
  fileB1.options = {}
  
  let fileB2 = {}
  fileB2.value = FS.createReadStream(__dirname + '/_fileB2.txt')
  fileB2.options = {}
  
  let formData = {}
  formData['name']  = 'kid'
  formData['age']   = 18
  formData['A'] = fileA
  formData['B'] = [ fileB1, fileB2 ]
  
  let options = { formData: formData }
  
  client.get('/data-and-file', options, function(res, body){
    let data = { name: 'kid', age: '18' }
    let file = {
      A: {
        filename: '_fileA.txt',
        name: '_fileA',
        type: 'txt',
        size: 10,
        mime: 'text/plain',
        data: 'hi, file A'
      },
      B: [
        {
          filename: '_fileB1.txt',
          name: '_fileB1',
          type: 'txt',
          size: 11,
          mime: 'text/plain',
          data: 'hi, file B1'
        },
        {
          filename: '_fileB2.txt',
          name: '_fileB2',
          type: 'txt',
          size: 11,
          mime: 'text/plain',
          data: 'hi, file B2'
        }
      ],
      length: 3
    }
    body.should.equal(JSON.stringify({
      data: data,
      file: file
    }))
    done()
  })
})