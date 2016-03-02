"use strict"
let Route = Airdog.import('Route')


test('Parse Normal-Path', function(){
  let route = new Route('/A/', function(){})
  route.regexp.should.eql(/^\/A\/$/)
})



test('Parse Param-Path', function(){
  let route = new Route('/:p/', function(){})
  route.regexp.should.eql(/^\/([^\/]+?)\/$/)
})



test('Parse Star-Path', function(){
  let route = new Route('/*/', function(){})
  route.regexp.should.eql(/^\/(?:.+)\/$/)
})



test('Parse All-Path', function(){
  let route = new Route('*', function(){})
  route.regexp.should.eql(/^(?:.+)$/)
})



test('Parse Mixed-Path', function(){
  let route = new Route('/A/:p/*/', function(){})
  route.regexp.should.eql(/^\/A\/([^\/]+?)\/(?:.+)\/$/)
})