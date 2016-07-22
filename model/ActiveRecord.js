import _ from 'lodash'
import { dict } from './'


export default class ActiveRecord {


  static $schema = null
  static $table = null


  static async find(query={})
  {
    let rawRecord = await this.$table.find(query)
    return rawRecord ?
      await format(this.$schema, rawRecord)
    : null
  }


  static async findAll(query={})
  {
    let records = []
    let rawRecords = await this.$table.findAll(query)
    for(let i = 0; i < rawRecords.length; i++){
      records.push(await format(this.$schema, rawRecords[i]))
    }
    return records
  }


  static async create(record){
    record = createFilter(this.$schema, record)
    record.createDate = new Date
    record.id = await this.$table.create(record)
    return record.id? record: null
  }

  static async update(query, record){
    await this.$table.update(query, record)
  }

}



function createFilter(schema, record){
  let actualRecord = {}
  schema.list.forEach(item=>{
    let {keyPath, type} = item
    let value = _.get(record, keyPath)
    value = filter(item, value)
    if(value !== undefined){
      _.set(actualRecord, keyPath, value)
    }
  })
  return actualRecord
}


async function format(schema, rawRecord)
{
  let record = {}
  for(let i = 0; i < schema.list.length; i++)
  {
    let item = schema.list[i]
    let value = _.get(rawRecord, item.keyPath)
    value = await formatEach(item, value)
    if(value !== undefined){
      _.set(record, item.keyPath, value)
    }
  }
  return record
}


async function formatEach(item, value)
{
  return item.$ref ?
    await inflate(item, value)
  : filter(item, value)
}


async function inflate(item, value)
{
  let model = item.$ref
  if(item.type === Array){
    let ids = value || []
    return await dict[model].findAll({id: {$in: ids}})
  }else{
    let id = value
    return await dict[model].find({id})
  }
}


function filter(item, value)
{
  if(value === null){
    return null
  }
  let type = item.type
  switch(typeof value){
    case 'boolean': return type === Boolean? value: undefined
    case 'number':  return type === Number?  value: undefined
    case 'string':  return type === String?  value: undefined
    default:
      return value instanceof type? value: undefined
  }
}