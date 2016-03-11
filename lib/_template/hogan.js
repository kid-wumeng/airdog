"use strict"
const Hogan = require('hogan.js')


exports.compile = function(template){
  return Hogan.compile(template)
}


exports.render = function(template, data){
  return template.render(data)
}