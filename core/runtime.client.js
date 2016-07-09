import * as util  from 'AIRDOG_DIR/core/module/util.client'
import * as model from 'AIRDOG_DIR/core/module/model.client'


try{

  let socket = require('socket.io-client')()
  socket.on('addRecord', function(message){
    console.log('add');
    console.log(message);
  })
  socket.on('updateRecord', function(message){
    console.log('update');
    console.log(message);
  })
  socket.on('removeRecord', function(message){
    console.log('remove');
    console.log(message);
  })
  socket.on('deleteRecord', function(message){
    console.log('delete');
    console.log(message);
  })

  socket.emit('subscribe', {
    model: 'User',
    method: 'findAll',
    query: {
    }
  })



  global.$database = {}
  global.$util = {}
  global.$model = {}

  util.init()
  model.init()

}catch(e){
  console.error(e)
}
