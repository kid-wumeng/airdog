import fs from 'fs'
import webpack from 'webpack'
import * as store from './store'
import * as util from './module/util.server'
import * as model from './module/model.server'
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

  require('./ready')
  await store.init()
  util.init()
  model.init()


  var compiler = webpack({
    entry: [`${AIRDOG_DIR}/core/runtime.client`],
    output: {
      path: `${RUNTIME_DIR}/build`,
      name: 'bundle.js',
    },
    resolve: {
      alias: {
        AIRDOG_DIR:  AIRDOG_DIR,
        RUNTIME_DIR: RUNTIME_DIR,
      },
    },
    resolveLoader: {
      root: `${AIRDOG_DIR}/node_modules`,
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          query: {
            presets: ['es2015-without-strict'],
            plugins: [
              //  @REVIEW .default
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
    let bundle = fs.readFileSync(`${RUNTIME_DIR}/build/bundle.js`)

    let server = new Server()
    server.get('/', function*(){
      yield this.render('index', {bundle})
    })
    server.listen(3000)
  })


})()