// async function fn(){
//
//   async function m1(){
//     console.log('m1 Start');
//     await m2()
//     console.log('m1 End');
//   }
//   async function m2(){
//     console.log('m2 Start');
//     await m3()
//     console.log('m2 End');
//   }
//   async function m3(){
//     console.log('m3 Start');
//     await end()
//     await m4()
//     console.log('m3 End');
//   }
//   async function m4(){
//     console.log('m4 Start');
//     console.log('m4 End');
//   }
//
//   async function end(){
//     console.log('end');
//     throw 'fdff'
//   }
//
//   await m1()
//
// }
//
// fn()


import Airdog from './lib/Airdog'
let MiddlewareQueue = Airdog.import('MiddlewareQueue')

let midQue = new MiddlewareQueue()
midQue.add(async function(){
  console.log('1 start')
  await this.next
  console.log('1 end')
})
midQue.add(async function(){
  console.log('2 start')
  await this.next
  console.log('2 end')
})
midQue.add(async function(){
  console.log('3 start')
  await this.next
  console.log('3 end')
})
midQue.add(async function(){
  console.log('4 start')
  await this.next
  console.log('4 end')
})
midQue.run()