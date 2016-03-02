require('babel-core/register')
require('babel-polyfill')

global.Airdog = require('../')
global.client = require('request')
require('./debug')