global.isClient = true
global.$database = {}


global.socket = require('socket.io-client')()
socket.on('modify', action=>{
  let {table, method, record} = action
  switch(method){
    case 'create': handleCreate(table, record); break
    case 'update': handleUpdate(table, record); break
    case 'remove': handleRemove(table, record); break
    case 'delete': handleDelete(table, record); break
  }
})


function handleCreate(table, record){
  console.log(record.content)
  $database[table].push(record)
}


function handleUpdate(table, record){
  let records = $database[table]
  for(let i = 0; i < records.length; i++){
    if(records[i].id === record.id){
      records[i] = record
      break
    }
  }
}


function handleRemove(table, record){
  let records = $database[table]
  for(let i = 0; i < records.length; i++){
    if(records[i].id === record.id){
      records[i] = record
      break
    }
  }
}


function handleDelete(table, record){
  let records = $database[table], i
  for(i = 0; i < records.length; i++){
    if(records[i].id === record.id){
      break
    }
  }
  records.splice(i, 1)
}



let store = require('BEO/store')
global.ActiveRecord = require('BEO/store/ActiveRecord')



global.$model = {}
let req = require.context('CWD/model', false, /.js$/)
req.keys().forEach(path=>{
  let model = req(path)
  store.initVirtualTable(model)
  $model[model.name] = model
})


global.say = (content)=>{
  $model.Post.create({content})
}


// ;(async function(){
//   setInterval(async function(){
//     console.log(await $model.User.find({name: 'kid'}).fetch())
//   }, 1000)
// })()


// setInterval(()=>{console.log($database)}, 3000)