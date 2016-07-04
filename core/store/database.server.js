import Collection from './driver.MongoDB/Collection'

export function setDriver(Model){
  let dname = 'default'
  let cname = Model.name
  Model._driver = new Collection(dname, cname)
}