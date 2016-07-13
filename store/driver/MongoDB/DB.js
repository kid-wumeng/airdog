import { MongoClient } from 'mongodb'
import Table from './Table'

export default class DB {


  config = null
  conn = null


  constructor(config){
    this.config = config
  }


  async connect(){
    let {
      host='localhost',
      port='27017',
      database,
    } = this.config
    let uri = `mongodb://${host}:${port}/${database}`
    this.conn = await MongoClient.connect(uri)
  }


  table(name){
    return new Table(name, this.conn)
  }

}