import FS from 'fs'



function AsyncAwaitFS(app, raw){
  this.app = app
  this.raw = raw
  this.req = new Request(this.app, this.raw)

  new Delegator(this, this.req)
    .getter('method')
    .getter('protocol')
    .getter('host')
    .method('get')
}



const FS_METHODS = [
  'rename',
  'ftruncate',
  'chown',
  'fchown',
  'lchown',
  'chmod',
  'fchmod',
  'stat',
  'lstat',
  'fstat',
  'link',
  'symlink',
  'readlink',
  'realpath',
  'unlink',
  'rmdir',
  'mkdir',
  'readdir',
  'close',
  'open',
  'utimes',
  'futimes',
  'fsync',
  'write',
  'read',
  'readFile',
  'writeFile',
  'appendFile'
]


// To delegate samename methods of fs
// @TODO Test-cases


// methods.forEach(function(name){
//   exports[name] = async function(){
//     let args = [].slice.call(arguments)
//     return new Promise(function(resolve, reject){
//       args.push(function(err, res){
//         err ? reject(err) : resolve(res)
//       })
//       fs[name].apply(null, args)
//     })
//   }
// })






// exports.exists = async function(path){
//   return new Promise(function(resolve){
//     fs.exists(path, resolve)
//   })
// }



module.exports = AsyncAwaitFS