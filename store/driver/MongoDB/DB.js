import Table from './Table'

export default class {

  name = null
  conn = null

  constructor(name, conn){
    this.name = name
    this.conn = conn
  }

  async table(name){
    let table = new Table(name, this.conn)
    await table.init()
    return table
  }

}