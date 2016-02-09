module.exports = async function(){
  await this.next
  this.raw.res.end('123')
}