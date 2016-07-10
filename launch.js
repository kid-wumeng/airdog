(async()=>{try{


  var store = require('./store');
  var model = require('./model');

  await store.init()
  await model.init()


  global.$model = model.dict

  let user = await $model.User.update({name: 'kid2'}, {id: 300})
  // console.log(user);


}catch(e){
  let msg = e instanceof Error ? e.stack : e
  console.log(`\x1b[31m${msg}\x1b[0m`)
}})()