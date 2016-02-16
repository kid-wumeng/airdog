let Route = Airdog.import('Route')



test('Parse Normal-Path', function(){
  let regexp = Route.parseRegExp('/A')
  regexp.should.eql(/^\/A\/$/)
})



test('Parse Param-Path', function(){
  let regexp = Route.parseRegExp('/:p')
  regexp.should.eql(/^\/([^\/]+?)\/$/)
})



test('Parse Star-Path', function(){
  let regexp = Route.parseRegExp('/*')
  regexp.should.eql(/^\/(?:.+)\/$/)
})



test('Parse All-Path', function(){
  let regexp = Route.parseRegExp('*')
  regexp.should.eql(/^(?:.+)$/)
})



test('Parse Mixed-Path', function(){
  let regexp = Route.parseRegExp('/A/:p/*')
  regexp.should.eql(/^\/A\/([^\/]+?)\/(?:.+)\/$/)
})