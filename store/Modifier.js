import _ from 'lodash'
import store from './'

export default class Modifier {

  table = null
  query = null
  setField = {}


  constructor(table, query){
    this.table = table
    this.query = query
  }

  set(data){
    for(let field in data){
      this.setField[field] = _.cloneDeep(data[field])
    }
    return this
  }

  async create(){
    // @TODO
    return await store.table[this.table].create(this.setField)
  }
}