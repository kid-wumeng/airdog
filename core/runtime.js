import * as store from './store'


;(async function(){

  global.$error = (error, suggest) => {
    error = `[error] ${error}`
    console.log(`\x1b[31m${error}\x1b[0m`)
    if(suggest){
      suggest = `[suggest] ${suggest}`
      console.log(`\x1b[33m${suggest}\x1b[0m`)
    }
    throw error
  }

  await store.init()

  require('./module/util.server')
  require('./module/model.server')


  let result = await $model.User.delete({
    name: 'kid',
  })
  console.log(result);

})()