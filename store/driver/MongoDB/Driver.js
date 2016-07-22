import { MongoClient } from 'mongodb'
import DB from './DB'

export default class {

  async connect(name='test', op={}){
    let {
      host='localhost',
      port='27017',
    } = op
    let conn = await MongoClient.connect(`mongodb://${host}:${port}/${name}`)
    return new DB(name, conn)
  }

}