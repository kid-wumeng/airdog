require('babel-core/register')
require('babel-polyfill')

global.Airdog = require('../')
global.request = require('request')
require('./de')