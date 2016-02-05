import Airdog from './lib/Airdog'
let Route = Airdog.import('Route')

let route = new Route('/user/:id/*', function(){})

var res = route.match('/user/18/kid/')
console.log(res);