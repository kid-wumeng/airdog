import FS from 'fs'
import Delegator from './Delegator'


class AsyncAwaitFS {}


new Delegator(AsyncAwaitFS, FS)
  .async_await('rename')
  .async_await('ftruncate')
  .async_await('chown')
  .async_await('fchown')
  .async_await('lchown')
  .async_await('chmod')
  .async_await('fchmod')
  .async_await('stat')
  .async_await('lstat')
  .async_await('fstat')
  .async_await('link')
  .async_await('symlink')
  .async_await('readlink')
  .async_await('realpath')
  .async_await('unlink')
  .async_await('rmdir')
  .async_await('mkdir')
  .async_await('readdir')
  .async_await('close')
  .async_await('open')
  .async_await('utimes')
  .async_await('futimes')
  .async_await('fsync')
  .async_await('write')
  .async_await('read')
  .async_await('readFile')
  .async_await('writeFile')
  .async_await('appendFile')


AsyncAwaitFS.exists = async function(path){
  return new Promise(function(resolve){
    FS.exists(path, resolve)
  })
}

module.exports = AsyncAwaitFS