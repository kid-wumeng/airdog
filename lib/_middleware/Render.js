"use strict"
const Path = require('path')
const FS = require('fs')


exports.appCreate = function()
{
  this.app.render['template-store'] = {}
  
  let engine = this.app.render['template-engine']
  this.app.render['engine'] = initTemplateEngine(engine)
  
  // @TODO throw if is not set directory
  let dir = this.app.render['template-directory']
  loadTemplates.call(this, dir)
}



exports.mid = async function(){
  this.render = function(name, data){
    name = Path.normalize(`/${name}`)
    let tpl = this.app.render['template-store'][name]
    let engine = this.app.render['engine']
    this.body = engine.render(tpl, data)
  }
  
  await this.next
}



/**
* @param  { String | Object } engine
* @return { Object } engine
*/
function initTemplateEngine(engine){
  engine = engine || 'hogan'
  if(engine.constructor === String){
    return require(`../_template/${engine}`)
  }
  return engine
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
  let store  = this.app.render['template-store']
  let engine = this.app.render['engine']
  let name = getRelativeName.call(this, local)
  let file = FS.readFileSync(local, 'utf-8')
  store[name] = engine.compile(file)
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
  let dir = this.app.render['template-directory']
  let reg = new RegExp(`^${dir}`)
  return sub.replace(reg, '')
}