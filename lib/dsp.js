let socket = io()
socket.on('dsp', function(data){
  console.log(data)
})
socket.emit('dsp', {
  type: 'FIND',
  model: 'Post',
})

export default class DSP {

}