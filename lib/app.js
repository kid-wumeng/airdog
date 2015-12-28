import * as middleware from './middleware'


async function m1( next ){
  console.log('m1 start')
  await next()
  console.log('m1 end')
}

async function m2( next ){
  console.log('m2 start')
  await next()
  console.log('m2 end')
}


let midQue = [m1, m2]
let cb = middleware.combine(midQue)
cb()