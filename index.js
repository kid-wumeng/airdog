#!/usr/bin/env node

require('babel-register')({
  plugins: [
    require('babel-plugin-transform-decorators-legacy').default,
    require('babel-plugin-add-module-exports'),
    [
      require('babel-plugin-transform-es2015-modules-commonjs'),
      {strict: false}
    ],
    require('babel-plugin-transform-async-to-generator'),
    require('babel-plugin-transform-class-properties'),
    require('babel-plugin-transform-object-rest-spread'),
  ]
})

require('./launch')