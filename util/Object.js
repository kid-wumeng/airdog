export function is(obj, type){
  switch(type){
    case 'number':
    case 'boolean':
    case 'string':
    case 'function':
    case 'object':
    case 'undefined':
      return typeof obj === type
    case 'array':
      return Array.isArray(obj)
    case 'nil':
      return obj === null || obj === undefined
    case true:
    case false:
    case null:
    case undefined:
      return obj === type
    default:
      return obj instanceof type
  }
}