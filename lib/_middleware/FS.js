import AsyncAwaitFS from '../AsyncAwaitFS'

module.exports = async function(){
  this.fs = AsyncAwaitFS
  this.read = read
  this.isFile = isFile
  this.isDir = isFile
  

  await this.next
}



async function read(local, encoding){
  return await this.fs.readFile(local, encoding)
}



/**
* Is exist and a file ?
* @param  { String } local
* @return { boolean }
*/
async function isFile(local){
  let exist = await this.fs.exists(local)
  if( exist ){
    let stat = await this.fs.stat(local)
    return stat.isFile()
  }
  return false
}



/**
* Is exist and a directory ?
* @param  { String } local
* @return { boolean }
*/
async function isDir(local){
  let exist = await this.fs.exists(local)
  if( exist ){
    let stat = await this.fs.stat(local)
    return stat.isDirectory()
  }
  return false
}