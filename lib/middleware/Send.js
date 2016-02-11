module.exports = async function(){
  await this.next
  
  // @mock
  let body = 'hello, kid'
  
  this.raw.res.end(body)
  
}