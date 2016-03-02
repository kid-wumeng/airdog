import AsyncAwaitFS from '../AsyncAwaitFS'

module.exports = async function(){
  this.fs = AsyncAwaitFS
  this.read = read
  this.write = write
  this.isFile = isFile
  this.isDir = isDir
  
  await this.next
}



/**
* @param  { String } local
* @param  { String } encoding
* @return { Buffer | String } data
*/
async function read(local, encoding){
  return await this.fs.readFile(local, encoding)
}



/**
* @param  { String } local
* @param  { Buffer | String } data
* @param  { Object } option
* @return { Context } @this
*/
async function write(local, data, option){
  await this.fs.writeFile(local, data, option)
  return this
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