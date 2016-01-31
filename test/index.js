require('babel-polyfill')

require('./server')



require('chai').should()
let mocha = require('mocha')
global.suite = mocha.suite
global.test = mocha.test
global.request = require('request')

require('./suite/body')