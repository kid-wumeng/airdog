import Airdog from './lib/Airdog'
let Route = Airdog.import('Route')
let request = require('request')


let p = 'abc/**/kid'
let r1 = 'abc/1/2/kid'
let r2 = 'abc/1/kid'


let fn = function(){
  console.log('yes')
}
let route = new Route('*',fn)
let mid = route.match('/kid/dik/a/')
mid.run({})