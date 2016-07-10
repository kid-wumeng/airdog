export default class {

  dict = {}

  async init(){
    let driver = {
      MongoDB: require('./driver/MongoDB')
    }
    let name = 'orz-world'
    this.dict[name] = await driver.MongoDB.connect(name)
  }

  database(name){
    return this.dict[name]
  }

}