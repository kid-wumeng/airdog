#!/usr/bin/env node

require('babel-register')({
  plugins: [
    require('babel-plugin-transform-decorators-legacy').default,
    require('babel-plugin-add-module-exports'),
    require('babel-plugin-transform-es2015-modules-commonjs'),
    require('babel-plugin-transform-async-to-generator'),
    require('babel-plugin-transform-class-properties'),
  ]
})

global.AIRDOG_DIR =  __dirname
global.PROJECT_DIR = process.cwd()

require('./core/runtime')

// global.$util = require('./util')

// global.AIRDOG_DIR =  __dirname
// global.PROJECT_DIR = process.cwd()
// let rollup = require('rollup')
// let babel = require('babel-core')
// var es2015 = require('babel-preset-es2015')
// rollup.rollup({
//   entry: `${__dirname}/lib/main.js`,
// }).then(function(bundle){
//   var bundleCode = bundle.generate().code
//   try{
//   var babelCode = babel.transform(bundleCode, {
//     "presets": [es2015]
//   }).code
// }catch(e){
//   console.log(e);
// }
//   console.log(babelCode);
// }, function(err){
//   console.log(err);
// })


// let FileTree = require('./util/FileTree')

// let modelFileTree = new FileTree(`${PROJECT_DIR}/model`)


// let lib = new FileManageService(`${__dirname}/lib`)
// lib.on('afterLoadFile', text=>{
//   let filelib.getFileDict
// })


// global.store = {
//   Post: [
//     {id: 1, title: '1~!'},
//     {id: 2, title: '2~!'},
//     {id: 3, title: '3~!'},
//     {id: 4, title: '4~!'},
//     {id: 5, title: '5~!'},
//     {id: 6, title: '6~!'},
//     {id: 7, title: '7~!'},
//     {id: 8, title: '8~!'},
//     {id: 9, title: '9~!'},
//     {id: 10, title: '10~!'},
//   ]
// }


// let LiveQuery = require('./core/subscription/LiveQuery')
// let DBI = require('./core/store/DBI')
// let liveQuery = new LiveQuery(function(){
//   return store.Post.slice(5)
// })
//
// let record = {id: 12, title: 'hahaha'}
// store.Post.push(record)
// liveQuery.emit('react', record)


// const fs = require('fs')
// let yaml = require('js-yaml')
// let DSP = require('./core/DSP')
//
// global.AIRDOG_DIR =  __dirname
// global.PROJECT_DIR = process.cwd()
//
// global.$config = {
//   dsp: yaml.safeLoad(fs.readFileSync(`${AIRDOG_DIR}/config/dsp.yml`, 'utf-8'))
// }
//
// let Server = require('./core/Server')
// let server = new Server()
//
//
// let libs = loadLibs('socket.io', 'dsp')
// function loadLibs(){
//   return [].slice.call(arguments)
//     .map(loadLib)
//     .reduce((libs, lib) => libs+=lib)
// }
// function loadLib(name){
//   let path = `${AIRDOG_DIR}/lib/${name}.js`
//   let script = fs.readFileSync(path, 'UTF-8')
//   return `<script>${script}</script>`
// }
//
// server.get('/', function*(){
//   let html = fs.readFileSync(`${PROJECT_DIR}/page/index.html`, 'UTF-8')
//   this.body = html + libs
// })
//
//
// server.addWSEvent('dsp', DSP.onMessage)
//
//
// server.listen(3000)


// global.LIB = `${__dirname}/lib`
//
//
// let server = new Server()
// server.on('update', function(data){
//   this.socket.emit('update-success', {
//     ok: true,
//     data
//   })
// })
// server.listen(3000)


// var chokidar = require('chokidar');
// chokidar.watch('lib').on('all', (event, path) => {
//   console.log(event, path);
// });