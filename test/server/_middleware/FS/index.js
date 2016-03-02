"use strict"


app.get('/read', async function(){
  let local = __dirname + '/_read.txt'
  this.body = await this.read(local)
})



app.get('/write', async function(){
  let local = __dirname + '/_write.txt'
  let testData = this.get('Test-Data')
  await this.write(local, testData)
  this.body = await this.read(local)
})



app.get('/isFile', async function(){
  let local = __dirname + '/_file.txt'
  this.body = await this.isFile(local)
})



app.get('/isDir', async function(){
  let local = __dirname + '/_dir'
  this.body = await this.isDir(local)
})



app.get('/isFile-noExist', async function(){
  let local = __dirname + '/_.txt'
  this.body = await this.isFile(local)
})



app.get('/isDir-noExist', async function(){
  let local = __dirname + '/_'
  this.body = await this.isDir(local)
})