export default class ActiveRecord {

  static _isActiveRecord = true
  static _publishDict = true

  static publish(name, callback){
    this._publishDict[name] = callback
  }

}