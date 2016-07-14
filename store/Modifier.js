import _ from 'lodash'


export default class Modifier {


  table = null
  query = null
  $set = {}
  // @TODO The method inc()
  $inc = {}



  constructor(table, query)
  {
    this.table = table
    this.query = query
  }



  set(data)
  {
    // @TODO More overrides
    // @TODO Filter by schema
    for(let field in data){
      this.$set[field] = data[field]
    }
    return this
  }



  async create()
  {
    return await this.table.create(this)
    // @TODO Filter result record
  }



  async update()
  {
    // @TODO Ignore has removed record
    return await this.table.update(this.query, this)
    // @TODO Filter result record
  }



  async remove()
  {
    let modifier = new Modifier(this.table, this.query)
    // @TODO set('removeDate', new Date)
    return await modifier.set({removeDate: new Date}).update()
    // @TODO Filter result record
  }



  async delete()
  {
    return await this.table.delete(this.query)
    // @TODO Filter result record
  }

}