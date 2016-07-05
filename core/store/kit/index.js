/**
* Create a new model and set it's values by record
* @param  (string) name
* @param  (string) record
* @return (Object) model
*/
export function createModel(name, record){
  let model = new $model[name]
  // @TODO set with it's schema
  for(let name in record){
    model[name] = record[name]
  }
  return model
}