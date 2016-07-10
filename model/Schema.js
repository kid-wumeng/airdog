import deepKeys from 'deep-keys'
import _ from 'lodash'


export default class Schema {


  static $keys = ['$ref', '$type', '$server']

  raw = {}
  list = []


  constructor(raw){
    this.raw = {
      id: Number,
      ...raw,
      createDate: Date,
      updateDate: Date,
      removeDate: Date,
    }
    this.transfrom()  // raw -> list
  }


  transfrom = () =>
  {
    let keyPaths = deepKeys(this.raw, true).filter(keyPath=>{
      return !Schema.$keys.some($key => _.endsWith(keyPath, $key))
    })
    this.list = keyPaths.map(this.transfromEach)
  }


  transfromEach = keyPath =>
  {
    let value = _.get(this.raw, keyPath)
    switch(true){
      case _.isPlainObject(value):
        return {keyPath, type: Object, ..._.pick(value, Schema.$keys)}
      case Array.isArray(value):
        return {keyPath, type: Array, ...value[0]}
      default:
        return {keyPath, type: value}
    }
  }

}