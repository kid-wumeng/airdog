import mongodb from 'mongodb'
import Collection from './Collection'


export default class DB {

  db = null

  async connect(){
    this.db = await mongodb.MongoClient.connect('mongodb://localhost:27017/test')
  }

  use(colName){
    return new Collection(this.db, colName)
  }
}