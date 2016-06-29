export default class ActiveRecord {

  static _collection = null

  static async find(query){
    return await this._collection.find(query)
  }

  static async findAll(query){
    let result = await this._collection.findAll(query)
    return result.toArray()
  }

  static async add(record){
    return await this._collection.add(record)
  }

  static async update(query, record){
    return await this._collection.update(query, record)
  }

  static async delete(query){
    return await this._collection.delete(query)
  }


}