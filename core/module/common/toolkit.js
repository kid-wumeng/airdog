/**
* Get the module info ( name and type )
* For example, `./xxx/User.server.js` -> {name: `User`, type: `server`}
* The type: `common` | `client` | `server`
*
* @param  (string) - module's path ( absolute or relative )
* @return (Object) - {name, type}
*/

export function moduleInfo(path)
{
  // name = `./xxx/User.server.js` -> `User.server`
  let name = path.slice(path.lastIndexOf('/') + 1, path.lastIndexOf('.'))
  let type = 'common'
  // name = `User`
  name = name.replace(/(\.client|\.server)$/, (match)=>{
    type = match.slice(1)  // type = `.server` -> `server`
    return ''
  })
  return {name, type}
}




/**
* Merge two modules ( dest <- src )
* Include the static and prototype properties
* The constructor is dest
* @param (Object) dest
* @param (Object) src
*/

export function merge(dest, src)
{
  // Merge the static properties
  Reflect.ownKeys(src)
    .filter(name=>!['name', 'length', 'prototype'].includes(name))
    .forEach(name=>dest[name]=src[name])

  // Merge the prototype properties
  if(src.prototype){
    Reflect.ownKeys(src.prototype)
      .filter(name=>!['constructor'].includes(name))
      .forEach(name=>dest.prototype[name]=src.prototype[name])
  }
}




/**
* Create a class
* and combine some modules which supply them static and prototype properties
* @param  (string) - class name
* @param  (Object[]) modules
* @return (Object) - class
*/

export function createClass(name, modules)
{
  let Class = function(){}
  Object.defineProperty(Class, 'name', {
    value: name
  })
  modules.forEach(module => merge(Class, module))
  return Class
}