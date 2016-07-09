import * as util  from 'AIRDOG_DIR/core/module/util.client'
import * as model from 'AIRDOG_DIR/core/module/model.client'


try{

  let socket = require('socket.io-client')()
  socket.on('addRecord', function(message){
    console.log(message);
  })
  socket.emit('subscribe', {
    model: 'User',
    method: 'findAll',
    query: {
      name: 'kid'
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
