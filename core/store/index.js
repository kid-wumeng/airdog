import { MongoClient } from 'mongodb'

export async function init(){
  global.$database = {}
  if(!$database['default']){
    $database['default'] = await MongoClient.connect('mongodb://localhost:27017/test')
  }
}