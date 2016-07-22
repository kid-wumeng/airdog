if(global.isClient){
  var Store = require('BEO/store/Store')
}else{
  var Store = require('./Store')
}

module.exports = new Store