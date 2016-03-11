"use strict"
const Path = require('path')
const FS = require('fs')


exports.appCreate = function(){
  this.app.render['template-engine'] = initTemplateEngine(this.app.render['template-engine'])
  
  // @TODO throw if is not set directory
  let dir = this.app.render['template-directory']
  this.app.render.templateStore = {}
  load(this.app.render.templateStore, dir, null, this.app.render['template-engine'])
}


exports.mid = async function(){
  this.render = function(tpl, data){
    let engine = this.app.render['template-engine']
    tpl = this.app.render.templateStore[Path.normalize(`/${tpl}`)]
    this.body = engine.render(tpl, data)
  }
  
  await this.next
}


function initTemplateEngine(engine){
  engine = engine || 'hogan'
  if(engine.constructor === String){
    return require(`../_template/${engine}`)
  } else {
    return engine
  }
}


function load(store, dir, parent, engine){
  parent = parent || ''
  let children = FS.readdirSync(`${dir}`)
  children.forEach(function(child){
    let path = Path.normalize(`${dir}/${child}`)
    let stat = FS.statSync(path)
    let isFile = stat.isFile()
    if( isFile ){
      let name = Path.normalize(`/${parent}/${child}`)
      let file = FS.readFileSync(path, 'utf-8')
      store[name] = engine.compile(file)
    } else {
      load(store, path, child, engine)
    }
  })
}