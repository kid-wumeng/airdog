let EventEmitter = require('events')
let fs = require('fs')
let path = require('path')
let chokidar = require('chokidar')


export default class FileManager extends EventEmitter {

  constructor(op){
    super()

    op = Object.assign({
      root: null,
      depth: 1000,
      types: [],
      ignoreExt: false,
      watch: false,
    }, op)
    this.root = op.root
    this.depth = op.depth
    this.types = op.types
    this.ignoreExt = op.ignoreExt
    this.watch = op.watch

    this.afterReady = false
    this.currentDepth = 0

    if(this.watch){
      chokidar.watch(this.root, {
        depth: this.depth - 1
      })
        .on('ready', ()=>this.afterReady=true)
        .on('add', this.addFile)
        .on('change', this.updateFile)
        .on('unlink', this.deleteFile)
    }
  }


  getAllFilePaths(){
    // Use the level-order traversal
    let allFilePaths = []
    let currentDepth = 0
    let currentDepthNodeCount = 1
    let queue = [this.root]
    while(currentDepth <= this.depth && queue.length !== 0){
      let nodePath = queue.shift()
      let nodeStat = fs.statSync(nodePath)
      if(nodeStat.isFile()){
        let file = this.getFile(nodePath)
        if(this.check(file)){
          allFilePaths.push(nodePath)
        }
      }
      if(nodeStat.isDirectory()){
        let childNames = fs.readdirSync(nodePath)
        let childPaths = childNames.map(childName=>`${nodePath}/${childName}`)
        queue = queue.concat(childPaths)
      }
      currentDepthNodeCount--
      if(currentDepthNodeCount === 0){
        currentDepth++
        currentDepthNodeCount = queue.length
      }
    }
    return allFilePaths
  }


  // @TODO add method getAllFilePaths
  createTree(){
    this.currentDepth = 0
    return this.createNode(this.root)
  }


  createNode(path){
    let stat = fs.statSync(path)
    if(stat.isFile()){
      return this.createFileNode(path)
    }
    if(stat.isDirectory()){
      let node = this.createDirectoryNode(path)
      this.currentDepth--
      return node
    }
  }


  createFileNode(path){
    let file = this.getFile(path)
    return this.check(file)? file: null
  }


  createDirectoryNode(path){
    // Can't over the max depth
    this.currentDepth++
    if(this.currentDepth > this.depth){
      return null
    }

    let childnames = fs.readdirSync(path)
    let children = childnames.map(childname=>{
      let childpath = `${path}/${childname}`
      return this.createNode(childpath)
    })

    // Filter the files which are failed in check
    // or the empty directories
    return children.filter(node => node !== null && node.length !== 0)
  }


  getFile(filePath){
    const ROOT_REGEXP = new RegExp(`^${this.root}`)
    return {
      path: filePath,
      name: path.basename(filePath, path.extname(filePath)),
      type: path.extname(filePath).slice(1),
    }
  }


  check(file){
    if(this.types.length === 0){
      return true
    }
    return this.types.includes(file.type)
  }


  addFile = filePath => {
    let file = this.getFile(filePath)
    if(this.afterReady && this.check(file)){
      this.emit('addFile', file)
    }
  }


  updateFile = filePath => {
    let file = this.getFile(filePath)
    if(this.check(file)){
      this.emit('updateFile', file)
    }
  }


  deleteFile = filePath => {
    let file = this.getFile(filePath)
    if(this.check(file)){
      this.emit('deleteFile', file)
    }
  }


  static isDirectory(filePath){
    try{
      return fs.statSync(filePath).isDirectory()
    }catch(e){
      return false
    }
  }

}