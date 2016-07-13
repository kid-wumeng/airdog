import deepKeys from 'deep-keys'
import _ from 'lodash'


export default class Schema {


  static $KEYS = ['$ref', '$type', '$server']

  rawSchema = {}
  fields = {}
  normal = {}
  ref = {}


  constructor(rawSchema){
    this.rawSchema = {
      id: Number,
      ...rawSchema,
      createDate: Date,
      updateDate: Date,
      removeDate: Date,
    }
    this.transfrom()  // rawSchema -> fields ( normalField + refField )
  }


  transfrom(){
    let keyPaths = deepKeys(this.rawSchema, true).filter(keyPath=>{
      let is$key = Schema.$KEYS.some($key=>_.endsWith(keyPath, $key))
      return !is$key
    })
    keyPaths.forEach(this.transfromEach)
  }


  transfromEach = keyPath => {
    let value = _.get(this.rawSchema, keyPath)
    switch(true){
      case _.isPlainObject(value):
        value.$ref ?
          this.ref[keyPath] = {...value, $type: Object}
        : this.normal[keyPath] = {...value}
        break
      case Array.isArray(value):
        this.ref[keyPath] = {...value[0], $type: Array}
        break
      default:
        this.normal[keyPath] = {$type: value}
    }
  }


  filter(record){
    let $record = {}
    _.forEach(this.normal, (op, field)=>{
      let value = _.get(record, field)
      let type = op.$type
      if(this.match(value, type)){
        _.set($record, field, value)
      }
    })
    _.forEach(this.ref, (op, field)=>{
      let value = _.get(record, field)
      let type = op.$type
      if(this.match(value, type)){
        _.set($record, field, value)
      }
    })
    return $record
  }

  match(value, type)
  {
    switch(typeof value){
      case 'boolean': return type === Boolean
      case 'number':  return type === Number
      case 'string':  return type === String
      default:
        return value instanceof type
    }
  }

}