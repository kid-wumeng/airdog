import EventEmitter from 'events'

export default class LiveQuery extends EventEmitter {

  constructor(name, op){
    super()
    this.Model = $model[name]
    this.method = op.method
    this.query = op.query

    this.snapshot

    switch(this.method){
      case 'find':
        this.Model
          .on('addRecord', this.find_addRecord)
          .on('updateRecord', this.find_updateRecord)
          .on('removeRecord', this.find_removeRecord)
          .on('deleteRecord', this.find_deleteRecord)
        break
      case 'findAll':
        this.Model
          .on('addRecord', this.findAll_addRecord)
          .on('updateRecord', this.findAll_updateRecord)
          .on('removeRecord', this.findAll_removeRecord)
          .on('deleteRecord', this.findAll_deleteRecord)
        break
    }
  }


  async init(){
    await this.execute()
  }


  async execute(){
    let {Model, method, query} = this
    switch(method)
    {
      case 'find':
        let record = await Model.find(query)
        this.snapshot = record
        return record
      case 'findAll':
        let records = await Model.findAll(query)
        this.snapshot = records
        return records
    }
  }


  emit(event, record){
    super.emit(event, this.Model.name, record)
  }


  include(records, record){
    let i
    for(i = 0; i < records.length; i++)
      if(record.id === records[i].id)
        return true
    return false
  }


  find_addRecord = async (newRecord) => {
    let record = await this.execute()
    if(record && record.id === newRecord.id){
      this.emit('addRecord', newRecord)
    }
  }


  find_updateRecord = async (newRecord) => {
    let record = await this.execute()
    if(record && record.id === newRecord.id){
      this.emit('updateRecord', newRecord)
    }
  }


  find_removeRecord = async (dirtyRecord) => {
    if(this.snapshot && this.snapshot.id === dirtyRecord.id){
      this.emit('removeRecord', dirtyRecord)
      // @REVIEW
      await this.execute()
    }
  }


  find_deleteRecord = async (dirtyRecord) => {
    if(this.snapshot && this.snapshot.id === dirtyRecord.id){
      this.emit('deleteRecord', dirtyRecord)
      // @REVIEW
      await this.execute()
    }
  }


  findAll_addRecord = async (newRecord) => {
    let records = await this.execute()
    if(this.include(records, record)){
      this.emit('addRecord', newRecord)
    }
  }


  findAll_updateRecord = async (newRecord) => {
    let records = await this.execute()
    if(this.include(records, record)){
      this.emit('updateRecord', newRecord)
    }
  }


  findAll_removeRecord = async (dirtyRecord) => {
    if(this.include(this.snapshot, dirtyRecord)){
      this.emit('removeRecord', dirtyRecord)
      // @REVIEW
      await this.execute()
    }
  }


  findAll_deleteRecord = async (dirtyRecord) => {
    if(this.include(this.snapshot, dirtyRecord)){
      this.emit('deleteRecord', dirtyRecord)
      // @REVIEW
      await this.execute()
    }
  }


}