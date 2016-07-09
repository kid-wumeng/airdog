import * as util  from 'AIRDOG_DIR/core/module/util.client'
import * as model from 'AIRDOG_DIR/core/module/model.client'


try{

  global.$database = {}
  global.$util = {}
  global.$model = {}

  util.init()
  model.init()


  let socket = require('socket.io-client')()
  socket.on('addRecord', function({model, record}){
    $database[model].push(record)
  })
  socket.on('addRecords', function({model, records}){
    $database[model].push(...records)
  })
  socket.on('updateRecord', function({model, record}){
    $database[model].some((r, i)=>{
      if(r.id === record.id){
        $database[model][i] = record
        return true
      }
    })
  })
  socket.on('removeRecord', function({model, record}){
    $database[model].some((r, i)=>{
      if(r.id === record.id){
        r.removeRecord = record.removeRecord
        return true
      }
    })
  })
  socket.on('deleteRecord', function({model, record}){
    $database[model].some((r, i)=>{
      if(r.id === record.id){
        $database[model].splice(i, 1)
        return true
      }
    })
  })

  socket.emit('subscribe', {
    model: 'User',
    method: 'findAll',
    query: {
    }
  })


  global.addUser = function(name){
    socket.emit('addRecord', {
      model: 'User',
      record: {
        name
      }
    })
  }


}catch(e){
  console.error(e)
}
