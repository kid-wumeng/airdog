"use strict"
const Path = require('path')
const FS = require('fs')
const Kit = require('../Kit')


const DEFAULT_ENGINE = 'hogan'


exports.appCreate = function(){
  if(this.app.render)
  {
    this.app.render['store'] = {}
    initTemplateEngine.call(this)
    let dir = this.app.render['dir']
    loadTemplates.call(this, dir)
  }
}



exports.mid = async function(){
  this.render = function(name, data)
  {
    name = Kit.formatPath(`/${name}`)
    let store = this.app.render['store']

    if(data){
      let engine = this.app.render['engine']
      let ctpl = store[name].ctpl
      this.body = engine.render(ctpl, data)
    } else {
      this.body = store[name].tpl
    }
  }

  await this.next
}



/**
* @param  { String | Object } engine
* @return { Object } engine
*/
function initTemplateEngine(){
  let engine = this.app.render['engine'] || DEFAULT_ENGINE
  if( engine.constructor === String ){
    this.app.render['engine'] = require(`../_template/${engine}`)
  }
}



function loadTemplates(dir){
  let children = FS.readdirSync(`${dir}`)
  children.forEach(function(child){

    let local = Path.normalize(`${dir}/${child}`)

    FS.statSync(local).isFile() ?
      loadTemplate.call(this, local)
    : loadTemplates.call(this, local)

  }.bind(this))
}



function loadTemplate(local){
  let store  = this.app.render['store']
  let engine = this.app.render['engine']
  let name = getRelativeName.call(this, local)
  let tpl  = FS.readFileSync(local, 'utf-8')
  let ctpl = engine.compile(tpl)
  store[name] = { tpl: tpl, ctpl: ctpl }
}



/**
* For example,
* dir = '/Users/KID/project/views'
* sub = '/Users/KID/project/views/user/account/login.html'
* relative-name => '/user/account/login.html'
* @param  { String } sub
* @return { String } relative-name
*/
function getRelativeName(sub){
  let dir = Path.normalize(this.app.render['dir'])
  let name = sub.slice(dir.length).replace(/\\/g, '/')
  return Kit.formatPath(`/${name}`)
}