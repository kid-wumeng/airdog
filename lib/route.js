/* Public function */
exports.TransformAll = TransformAll
exports.Search = Search

/* Private function */
exports.transform = transform
exports.match = match
exports.convertType = convertType



const Path = require('path')



/**
 * Iterate all routes and transform their path to regular-expression.
 *
 * @param { Array } routes -
 *   For example, the struct like:
 *     [
 *       { path: '/A/B/C/',     middleware: m1 },
 *       { path: '/A/:p1/C/',   middleware: m2 },
 *       { path: '/A/:p1/:p2/', middleware: m3 },
 *     ]
 */
 
function TransformAll( routes )
{
  routes.forEach(function(route){
    route.regexp = transform(route.path)
  })
}







/**
 * Transform the path to regular-expression.
 *
 * The param-placeholder (:p1) will to a capture-group
 * and the star-placeholder (*) will to a non-capture-group.
 *
 * For example:
 *   '/A/:p1/*' =>  /^\/A\/([^\/]+?)\/(?:.+)\/$/
 *
 * It will add the '/' to start and end of path,
 * for example:
 *   '/A/B/C' -> '/A/B/C/'
 *   'A/B/C/' -> '/A/B/C/'
 *   'A/B/C'  -> '/A/B/C/'
 *
 * @param  { String } path
 * @return { RegExp }
 */

function transform( path )
{
  const OLD_PARAM = /:\S+?(?=\/)/g
  const NEW_PARAM = '([^\/]+?)'
  const OLD_STAR  = /\*/g
  const NEW_STAR  = '(?:.+)'
  
  let regexp = Path.normalize(`/${path}/`)
    .replace( OLD_PARAM, NEW_PARAM ) // Transform all :param
    .replace( OLD_STAR, NEW_STAR )   // Transform all *
    
  return new RegExp(`^${regexp}$`)
}





/**
 * Match the path with regular-expression.
 *
 * @param { String } path
 * @param { RegExp }
 *
 * @return { Array | false } -
 *   Return an array includes all params ( with ${} ) if successful
 *   else return false to express failed.
 */
 
function match( path, regexp )
{
  let res = path.match(regexp)
  if( res ){
    return res.slice(1).map((param)=>{
      return convertType(param)
    })
  }
  return false
}





/**
 * Convert the param-string to appropriate type.
 *
 *   int-string:    '12'   -> 12
 *   float-string:  '12.5' -> 12.5
 *   normal-string: 'kid'  -> 'kid'
 *
 * @param  { String } param
 * @return { number | String }
 */
 
function convertType( param )
{
  const NUMBER_REGEXP = /^\d+(\.\d+)?$/
  switch(true)
  {
    case NUMBER_REGEXP.test( param ): return parseFloat( param )
    default: return param
  }
}





/**
 * Search all middlewares from matched route
 *
 * @param { String } path
 * @param { Array } routes -
 *   For example, the struct like:
 *     [
 *       { path: '/A/B/C/',     middleware: m1 },
 *       { path: '/A/:p1/C/',   middleware: m2 },
 *       { path: '/A/:p1/:p2/', middleware: m3 },
 *     ]
 *
 * @return { Array } matches -
 *   Includes all matched middlewares and their actual-params.
 *   For example, the struct like:
 *     [
 *       { fn: m1, params: [] },
 *       { fn: m2, params: [12] },
 *       { fn: m3, params: [12, 'kid'] },
 *     ]
 *   Or return [] if there's non-matched route.
 */
 
function Search( path, routes )
{
  path = Path.normalize(`/${path}/`)
  let params, middlewares = []

  routes.forEach(function(route)
  {
    params = match( path, route.regexp )
    if( params !== false ){
      middlewares.push({
        fn: route.middleware,
        params: params
      })
    }
  })
  return middlewares
}