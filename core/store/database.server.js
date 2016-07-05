import MongoDB from './driver/MongoDB/DB'


export async function init(){
  let name, config, DB, db
  for(name in $config['database']){
    config = $config['database'][name]
    switch(config.driver){
      case 'MongoDB': DB = MongoDB; break
      default:
        throw `Not Found Driver: ${config.driver}`
    }
    db = new DB({
      name,
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
    })
    await db.connect()
    $database[name] = db
    if(config.default){
      $database['default'] = db
    }
  }
}