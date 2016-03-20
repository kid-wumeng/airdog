"use strict"
let Event = Airdog.import('Event')


test('On and Emit Event', function(){
  let evt = new Event
  evt.on('start', function(){
    this.name.should.equal('kid')
  })
  evt.emit('no-exist')
  evt.emit('start', {'name': 'kid'})
})