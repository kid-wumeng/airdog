export default class ActiveRecord {

  static _driver = null

  static find(query){
    let record = this._driver.find(query)
    return record ?
      create(this.name, record)
    : null
  }

  static findAll(query){
    let result = this._driver.findAll(query)
  }

  static add(record){
    return this._driver.add(record)
  }

  static update(query, record){
    return this._driver.update(query, record)
  }

  static delete(query){
    return this._driver.delete(query)
  }

}


function create(name, record){
  let model = new $model[name]
  for(let name in record){
    model[name] = record[name]
  }
  return model
}