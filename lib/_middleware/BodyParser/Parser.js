// @REVIEW recode


import Path from 'path'
import Kit from '../../Kit'


function Parser(){}


/**
* @param  { Context } ctx
* @return { Array<String> } blocks
*/
Parser.parseData = function(ctx){
  let ct = ctx.get('Content-Type')
  let data = ctx.raw.data
  let bound = Parser.getBound(ct)
  let blocks = Parser.split(data, bound)
  return Parser.parseBlocks(blocks)
}



/**
* @param  { String } ct - Content-Type
* @return { String | null } bound
*/
Parser.getBound = function(ct){
  let result = ct.match(/boundary=(.+)$/)
  return result[1]
}



/**
* @param  { String } data
* @param  { String } bound
* @return { Array<String> } blocks
*/
Parser.split = function(data, bound)
{
  const BOUND       = new RegExp(`--${bound}`)
  const LEFT_BOUND  = new RegExp(`^--${bound}`)
  const RIGHT_BOUND = new RegExp(`--${bound}--$`)
  
  let blocks = data.trim()
    .replace(LEFT_BOUND, '')
    .replace(RIGHT_BOUND, '')
    .split(BOUND)
  
  return blocks.map(function(block){
    return block.trim()
  })
}



/**
* @param  { Array<String> } blocks
* @return { Array<Object>, Array<Object> } fileBlocks, formBlocks
*/
Parser.parseBlocks = function(blocks){
  let fileBlocks = [], formBlocks = []
  blocks.forEach(function(block){
    block = Parser.parseBlock(block)
    block.filename ?
      fileBlocks.push(block)
    : formBlocks.push(block)
  })
  return [fileBlocks, formBlocks]
}



/**
* @param  { String } block
* @return { Object } block
*/
Parser.parseBlock = function(block){
  let [head, body] = block.split('\r\n\r\n')
  block = Parser.parseBlockHead(head)
  block.body = body
  return block
}



/**
* File data, return { name: String, filename: String, mime: String }
* Form data, return { name: String }
* @param  { String } head
* @return { Object } head
*/
Parser.parseBlockHead = function(head){
  let isFile = /Content-Type/.test(head)
  return isFile ?
    Parser.parseFileBlockHead(head)
  : Parser.parseFormBlockHead(head)
}



/**
* @param  { String } head
* @return { Object } head
*/
Parser.parseFileBlockHead = function(head){
  const NAME = /;\s*name="([^"]+)"/
  const FILENAME = /;\s*filename="([^"]+)"/
  const MIME = /^Content-Type:\s(.+)$/m
  
  return {
    name:     head.match(NAME)[1],
    filename: head.match(FILENAME)[1],
    mime:     head.match(MIME)[1]
  }
}



/**
* @param  { String } head
* @return { Object } head
*/
Parser.parseFormBlockHead = function(head){
  const NAME = /;\s*name="([^"]+)"/
  return {
    name: head.match(NAME)[1],
  }
}



/**
* @param { Array<Object> } formBlocks
*/
Parser.formatForm = function(formBlocks){
  let table = {}
  let name, body
  formBlocks.forEach(function(block){
    let {name, body} = block
    Parser.addItem(name, body, table)
  })
  Parser.exposeOneValue(table)
  Kit.merge(this.data, table)
}



/**
* @param  { Array<Object> } formBlocks
*/
Parser.formatFile = function(fileBlocks){
  let table = {}
  let name, file
  fileBlocks.forEach(function(block){
    name = block.name
    file = Parser.initFile(block)
    Parser.addItem(name, file, table)
  })
  Parser.exposeOneValue(table)
  Kit.merge(this.file, table)
  this.file.length = fileBlocks.length
}



/**
* For example,
* name = 'a', value = {...}
* table => { a: {...} }
* @param { String } name
* @param { * } value
* @param { Object } table
*/
Parser.addItem = function(name, value, table){
  if(!table[name])
    table[name] = []
  table[name].push(value)
}



/**
* For example,
* table =  { a: [1, 2], b: [1] }
* table => { a: [1, 2], b: 1 }
* @param { Object } table
*/
Parser.exposeOneValue = function(table){
  let name, value, array, isOne
  for(name in table){
    array = table[name]
    isOne = array.length === 1
    if(isOne)
      table[name] = array[0]
  }
}



/**
* @param { Object } block
* @param { Object } file
*/
Parser.initFile = function(block)
{
  let filename = block.filename
  let name = filename.slice(0, filename.lastIndexOf('.'))
  let type = Path.extname(filename).slice(1)
  let data = block.body
  let size = data.length
  let mime = block.mime
  
  return {
    filename: filename,
    name: name,
    type: type,
    size: size,
    mime: mime,
    data: data,
  }
}



module.exports = Parser