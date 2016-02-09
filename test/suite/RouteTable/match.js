let Route = Airdog.import('Route')
let RouteTable = Airdog.import('RouteTable')



test('Match by Normal-Path with method ALL', function(done)
{
  let flag = new Flag(6)
  
  async function fn1(){
    flag.mark(1)
    await this.next
    flag.mark(6)
    
    flag.assert()
    done()
  }
  
  async function fn2(){
    flag.mark(2)
    await this.next
    flag.mark(5)
  }
  
  async function fn3(){
    flag.mark(3)
    await this.next
    flag.mark(4)
  }
  
  let routeTable = new RouteTable
  let r1 = new Route('/user/12', fn1)
  let r2 = new Route('/user/12', fn2)
  let r3 = new Route('/user/12', fn3)
  routeTable.add(RouteTable.ALL, r1)
  routeTable.add(RouteTable.ALL, r2)
  routeTable.add(RouteTable.ALL, r3)
  let midQue = routeTable.match(RouteTable.POST, '/user/12')
  midQue.run()
})



test('Match by Mixed-Path with method GET', function(done)
{
  let flag = new Flag(4)
  
  async function fn1(type, name){
    type.should.equal('image')
    name.should.equal('logo.png')

    flag.mark(1)
    await this.next
    flag.mark(4)
    
    flag.assert()
    done()
  }
  
  async function fn2(dir, name){
    dir.should.equal('src')
    name.should.equal('logo.png')

    flag.mark(2)
    await this.next
    flag.mark(3)
  }
  
  async function fn3(){
    flag.mark()
    await this.next
    flag.mark()
  }
  
  let routeTable = new RouteTable
  let r1 = new Route('/src/:type/*/:name', fn1)
  let r2 = new Route('/:dir/*/icon/:name', fn2)
  let r3 = new Route('/res/:type/*/:name', fn3)
  routeTable.add(RouteTable.GET, r1)
  routeTable.add(RouteTable.GET, r2)
  routeTable.add(RouteTable.GET, r3)
  let midQue = routeTable.match(RouteTable.GET, '/src/image/icon/logo.png')
  midQue.run()
})