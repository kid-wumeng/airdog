import deepKeys from 'deep-keys'
import _ from 'lodash'


export default class Schema {


  static SPECIAL_KEYS = ['$join', '$type', '$server']

  rawSchema = null
  allField = {}
  normalField = {}
  joinField = {}



  constructor(rawSchema={})
  {
    this.rawSchema = {
      ...rawSchema,
      id: Number,
      createDate: Date,
      updateDate: Date,
      removeDate: Date,
    }
    this.transform()  // Create allField, normalField, joinField
  }



  transform()
  {
    let fields = deepKeys(this.rawSchema, true)
    // Ignore the fields which like `xxx.xxx.$join`
    fields.filter(field=>{
      let isSpecialField = Schema.SPECIAL_KEYS.some(key=>{
        _.endsWith(field, key)
      })
      return !isSpecialField
    })
    fields.forEach(this.transformEach)
  }



  transformEach = field =>
  {
    let value = _.get(this.rawSchema, field)
    switch(true){
      case _.isPlainObject(value):
        this.transformPlainObject(field, value)
        break
      case _.isArray(value):
        this.transformArray(field, value)
        break
      default:
        this.transformOneValue(field, value)
    }
  }



  transformPlainObject(field, obj)
  {
    let op = this.getOption(obj)
    op.$type = Object
    op.$join?
      this.allField[field] = this.joinField[field] = op
    : this.allField[field] = this.normalField[field] = op
  }



  // @REVIEW The array must be a join ?
  transformArray(field, array)
  {
    let op = this.getOption(array[0])
    op.$type = Array
    this.allField[field] = this.joinField[field] = op
  }



  transformOneValue(field, value)
  {
    let op = {$type: value}
    this.allField[field] = this.normalField[field] = op
  }



  getOption(obj)
  {
    return _.pick(obj, Schema.SPECIAL_KEYS)
  }



  filter(inputRecord){
    let value, type, outputRecord = {}
    _.forEach(this.allField, (op, field)=>{
      value = _.get(inputRecord, field)
      if(value){
        type = op.$type
        if(this.matchType(value, type)){
          if(type !== Object){
            _.set(outputRecord, field, value)
          }
        }
      }
    })
    return outputRecord
  }



  matchType(value, type)
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