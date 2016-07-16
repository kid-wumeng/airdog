import EventEmitter from 'events'
import crypto from 'crypto'
import _ from 'lodash'
import Query from './Query'

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
    this.id = crypto
      .createHash('md5')
      .update(where)
      .digest('hex')
  }


  async fetch(){
    this.snapshot = await this.query.fetch()
  }


  find = {

    async handleCreate(newRecord){
      await this.fetch()
      if(this.snapshot && this.snapshot.id === newRecord.id){
        this.emit('modify', {type: 'create', record: newRecord})
      }
    },

    async handleUpdate(newRecord){
      await this.fetch()
      if(this.snapshot && this.snapshot.id === newRecord.id){
        this.emit('modify', {type: 'update', record: newRecord})
      }
    },

    async handleRemove(dirtyRecord){
      if(this.snapshot && this.snapshot.id === dirtyRecord.id){
        this.emit('modify', {type: 'remove', record: dirtyRecord})
        await this.fetch()
      }
    },

    async handleDelete(dirtyRecord){
      if(this.snapshot && this.snapshot.id === dirtyRecord.id){
        this.emit('modify', {type: 'delete', record: dirtyRecord})
        await this.fetch()
      }
    },

  }

}