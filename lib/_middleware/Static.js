import Path from 'path'
import Process from 'process';


const CWD = Process.cwd()


module.exports = async function(){
  let r = await  findLocalPath.call(this)
  console.log(r);
  await this.next
}


async function findLocalPath(){
  let bases = this.app.static
  let base, localPath, exist
  for( let i = 0; i < bases.length; i++ ){
    base = bases[i]
    localPath = Path.normalize(`${CWD}/${base}/${this.path}`)
    exist = await this.fs.exists( localPath )
    if(exist)
      return localPath
  }
  return null
}