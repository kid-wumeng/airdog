import fs from 'fs'
import webpack from 'webpack'
import * as store from './store'
import Server from './Server'


;(async function(){

  global.$error = (error, suggest) => {
    error = `[error] ${error}`
    console.log(`\x1b[31m${error}\x1b[0m`)
    if(suggest){
      suggest = `[suggest] ${suggest}`
      console.log(`\x1b[33m${suggest}\x1b[0m`)
    }
    throw error
  }

  await store.init()


  require('./module/util.server')
  require('./module/model.server')


  var compiler = webpack({
    entry: ['babel-polyfill', `${AIRDOG_DIR}/core/runtime.client`],
    output: {
      path: `${AIRDOG_DIR}/build`,
      name: 'bundle.js',
    },
    resolve: {
      'alias': {
        AIRDOG_DIR: `${AIRDOG_DIR}`,
        PROJECT_DIR: `${PROJECT_DIR}`,
      }
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          include: [
            `${AIRDOG_DIR}`,
            `${PROJECT_DIR}/model`,
          ],
          loader: 'babel',
          query: {
            presets: ['es2015'],
            plugins: [
              'transform-decorators-legacy',
              'add-module-exports',
              'transform-async-to-generator',
              'transform-class-properties',
            ],
          }
        }
      ]
    }
  })


  compiler.run(function(err, stat) {
    console.log(stat.compilation.fileDependencies);
    let bundle = fs.readFileSync(`${AIRDOG_DIR}/build/bundle.js`)

    let server = new Server()
    server.get('/', function*(){
      yield this.render('index', {bundle})
    })
    server.listen(3000)
  })









})()