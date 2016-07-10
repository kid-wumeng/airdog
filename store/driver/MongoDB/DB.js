import Table from './Table'

export default class {

  name = null
  conn = null

  constructor(name, conn){
    this.name = name
    this.conn = conn
  }

  table(name){
    return new Table(name, this.conn)
  }

}