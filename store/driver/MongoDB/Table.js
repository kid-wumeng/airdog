export default class {

  name = null
  conn = null
  coll = null

  constructor(name, conn){
    this.name = name
    this.conn = conn
    this.coll = conn.collection(name)
    this.idFactory = conn.collection('id_factory')
  }

  async init(){
    let table = this.name
    let result = await this.idFactory.findOne({table})
    if(!result){
      this.idFactory.insert({table, id: 0})
    }
  }

  async find(query){
    return await this.coll.findOne(query)
  }

  async findAll(query){
    let cursor = await this.coll.find(query)
    return cursor.toArray()
  }

  async create(record){
    record.id = await this.makeID()
    let {result} = await this.coll.insert(record)
    delete record._id
    return result.ok? record.id: null
  }

  async update(query, record){
    this.coll.update({
      name: 'kid2'
    }, {
      id: {$inc: 1}
      name: 'kid2',
    })
    // let result = await this.coll.findAndModify(query, null, {$set: record}, {new: true})
    // return result.value
  }

  async makeID(){
    let table = this.name
    let $inc = {id: 1}
    let {value} = await this.idFactory.findAndModify({table}, null, {$inc}, {new: true})
    return value.id
  }

}