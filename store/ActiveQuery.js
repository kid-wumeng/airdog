import EventEmitter from 'events'
import md5 from 'md5'
import _ from 'lodash'



export default class ActiveQuery extends EventEmitter {

  id = null
  query = null
  table = null
  snapshot = null
  handleCreate = null
  handleUpdate = null
  handleRemove = null
  handleDelete = null

  constructor(query, initData){
    super()
    if(global.isClient){
      var Query = require('BEO/store/Query')
    }else{
      var Query = require('./Query')
    }
    this.query = query
    this.table = query.table
    this.snapshot = initData
    switch(this.query.method){
      case Query.FIND:
        this.handleCreate = this.find.handleCreate
        this.handleUpdate = this.find.handleUpdate
        this.handleRemove = this.find.handleRemove
        this.handleDelete = this.find.handleDelete
        break
      case Query.FIND_ALL:
        break
    }

    this.makeID()
  }


  makeID(){
    let where = JSON.stringify(this.query.$where)
    this.id = md5(where)
  }


  async fetch(){
    this.snapshot = await this.query.fetch()
  }


  notify(event, record){
    switch(event){
      case 'create': this.handleCreate(record); break
      case 'update': this.handleUpdate(record); break
      case 'remove': this.handleRemove(record); break
      case 'delete': this.handleDelete(record); break
    }
  }


  find = {

    async handleCreate(newRecord){
      await this.fetch()
      if(this.snapshot && this.snapshot.id === newRecord.id){
        this.emit('modify', {method: 'create', record: newRecord})
      }
    },

    async handleUpdate(newRecord){
      await this.fetch()
      if(this.snapshot && this.snapshot.id === newRecord.id){
        this.emit('modify', {method: 'update', record: newRecord})
      }
    },

    async handleRemove(dirtyRecord){
      if(this.snapshot && this.snapshot.id === dirtyRecord.id){
        this.emit('modify', {method: 'remove', record: dirtyRecord})
        await this.fetch()
      }
    },

    async handleDelete(dirtyRecord){
      if(this.snapshot && this.snapshot.id === dirtyRecord.id){
        this.emit('modify', {method: 'delete', record: dirtyRecord})
        await this.fetch()
      }
    },

  }

}