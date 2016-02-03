async function fn(){
  
  async function m1(){
    console.log('m1 Start');
    await m2()
    console.log('m1 End');
  }
  async function m2(){
    console.log('m2 Start');
    await m3()
    console.log('m2 End');
  }
  async function m3(){
    console.log('m3 Start');
    await end()
    await m4()
    console.log('m3 End');
  }
  async function m4(){
    console.log('m4 Start');
    console.log('m4 End');
  }
  
  async function end(){
    console.log('end');
    throw 'fdff'
  }
  
  await m1()
  
}

fn()