export default class {

  constructor(name){
    if(!$database[name]){
      $database[name] = {}
    }
    $database[name] = [{
      name: 'kid',
      age: 18,
      pet: {
        name: 'mimi',
        type: 'cat',
      }
    },{
      name: 'wumeng',
      age: 20,
      pet: {
        name: 'wangcai',
        type: 'dog',
      }
    }]

    this.records = $database[name]
  }


  find(query){
    query = query || {}
    // @TODO -> plain-object
    if(!$util.is(query, 'object') || $util.is(query, 'array')){
      throw 'Find Failed: the param `query` should be a plain-object'
    }
    let i, record
    for(i = 0; i < this.records.length; i++){
      record = this.records[i]
      // @TODO move to ActiveRecord
      if(record.removeDate){
        continue
      }
      if(matchObject(query, record)){
        return record
      }
    }
    return null
  }


  findAll(query){
    query = query || {}
    if(!$util.is(query, 'object') || $util.is(query, 'array')){
      throw 'Find All Failed: the param `query` should be a plain-object'
    }
    let i, record, records = []
    for(i = 0; i < this.records.length; i++){
      record = this.records[i]
      // @TODO move to ActiveRecord
      if(record.removeDate){
        continue
      }
      if(matchObject(query, record)){
        records.push(record)
      }
    }
    return records
  }


  add(record){
    let now = new Date
    record.id = `temp-${now.getTime()}`
    this.records.push(record)
    return record
  }


  update(query, record){
    vaildQuery(query)
    // @TODO patch update
    // @TODO replace this.find
    for(i = 0; i < this.records.length; i++){
      if(matchObject(query, this.records[i])){
        this.records[i] = record
        return {ok: true}
      }
    }
  }


  delete(query){
    vaildQuery(query)
    // @TODO replace this.find
    for(i = 0; i < this.records.length; i++){
      if(matchObject(query, this.records[i])){
        this.records.splice(i, 1)
        return {ok: true, n: 1}
      }
    }
  }

}



// @TODO move to ActiveRecord
function vaildQuery(query){
  if(!$util.is(query, 'object') || $util.is(query, 'array')){
    throw 'Update Failed: the param `query` should be a plain-object'
  }
}



function matchObject(o1, o2)
{
  if($util.is(o1, RegExp)){
    return matchRegExp(o1, o2)
  }
  if(!$util.is(o2, 'object')){
    return false
  }
  if($util.is(o1, 'array')){
    return matchArray(o1, o2)
  }
  // @TODO object -> plain-object
  for(let name in o1){
    let result = $util.is(o1[name], 'object') ?
      matchObject(o1[name], o2[name])
    : o1[name] === o2[name]
    if(!result){
      return false
    }
  }
  return true
}


function matchRegExp(regexp, string)
{
  if(!$util.is(string, 'string')){
    return false
  }
  return regexp.test(string)
}


function matchArray(arr1, arr2)
{
  if(!$util.is(arr2, 'array')){
    return false
  }
  if(arr1.length !== arr2.length){
    return false
  }
  let isObject = $util.is(arr1[0], 'object')
  for(let i = 0; i < arr1.length; i++){
    let match = isObject ?
      matchObject(arr1[i], arr2[i])
    : arr1[i] === arr2[i]
    if(!match){
      return false
    }
  }
  return true
}