export function init(){
  let req = require.context('AIRDOG_DIR/util', false, /^\.\/[^.]+(\.client)?.js$/)
  req.keys().forEach(path=>{
    let module = req(path)
    for(let name in module){
      $util[name] = module[name]
    }
  })
}