import AsyncAwaitFS from '../AsyncAwaitFS'

module.exports = async function(){
  this.fs = AsyncAwaitFS
  this.read = async function(path, encoding){
    return await this.fs.readFile(path, encoding)
  }

  await this.next
}