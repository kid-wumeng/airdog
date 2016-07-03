export default class Collection {

  constructor(dname, cname){
    if(!$database[dname]){
      $database[dname] = {}
    }
    $database[dname][cname] = [{
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

    this.records = $database[dname][cname]
  }


  find(query){
    if($util.is(query, 'nil')){
      return this.records[0]
    }
    // @TODO -> plain-object
    if(!$util.is(query, 'object') || $util.is(query, 'array')){
      $error('find failed, the param `query` should be a plain-object')
    }
    let i, record
    for(i = 0; i < this.records.length; i++){
      record = this.records[i]
      if(matchObject(query, record)){
        return record
      }
    }
    return null
  }


  findAll(query){
  }


  add(record){
  }


  update(query, record){
  }


  delete(query){
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