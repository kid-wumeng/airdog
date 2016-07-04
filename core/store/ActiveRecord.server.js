export default class ActiveRecord {

  static _driver = null

  static async find(query){
    return await this._driver.find(query)
  }

  static async findAll(query){
    let result = await this._driver.findAll(query)
    return result.toArray()
  }

  static async add(record){
    return await this._driver.add(record)
  }

  static async update(query, record){
    return await this._driver.update(query, record)
  }

  static async delete(query){
    return await this._driver.delete(query)
  }


}