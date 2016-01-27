let Hogan = require('hogan.js')

exports.render = function(tpl, data){
  return Hogan.compile(tpl).render(data)
}