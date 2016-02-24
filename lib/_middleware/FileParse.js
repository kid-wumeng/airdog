import Path from 'path'
import Kit from '../Kit'
const MIME_FILE = 'multipart/form-data'


module.exports = async function(){
  console.log(this.raw.data);
  if( this.type === MIME_FILE ){
    let bound = parseBound.call(this)
    let blocks = splitBody.call(this, bound)
    let files = blocks.map(function(block){
      block = parseBlock(block)
      return createFile(block)
    })
  }
  await this.next
}



function parseBound(){
  let contentType = this.get('Content-Type')
  contentType = Kit.parseKeyValues(contentType)
  return contentType.boundary
}



function splitBody(bound){
  const LEFT_BOUND  = new RegExp(`^--${bound}`)
  const RIGHT_BOUND = new RegExp(`--${bound}--$`)
  
  let data = this.raw.data.trim()
    .replace(LEFT_BOUND, '')
    .replace(RIGHT_BOUND, '')
    
  let blocks = data.split(`--${bound}`)
  blocks = blocks.map(function(block){
    return block.trim()
  })
  return blocks
}



function parseBlock(block){
  let [head, body] = block.split('\r\n\r\n')
  head = parseBlockHead(head)
  return {
    head: head,
    body: body
  }
}



function parseBlockHead(head){
  let lines = head.split('\r\n')
  let headMap = {}, field, value
  lines.forEach(function(line){
    [ field, value ] = line.split(':')
    field = field.trim()
    value = value.trim()
    headMap[field] = value
  })
  headMap['Content-Disposition'] = Kit.parseKeyValues(headMap['Content-Disposition'])
  return headMap
}



function createFile(block){
  let file = {}
  file.data = block.body
  file._name = block.head['Content-Disposition'].name.replace(/^"|"$/g, '')
  file.filename = block.head['Content-Disposition'].filename.replace(/^"|"$/g, '')
  file.name = file.filename.slice(0, file.filename.lastIndexOf('.'))
  file.type = Path.extname(file.filename).slice(1)
  file.size = file.data.length
  file.mime = block.head['Content-Type']
  return file
}


// this.files[0].data = '...'
// this.files[0].name = '...'
// this.files[0].filename = '...'
// this.files[0].ext = '...'
// this.files[0].length = '...'
// this.files[0].mime = '...'



/**
* For example 1,
* A: <input type="file">
* this.file => A
* this.file_len => 1
*
* For example 2,
* A: <input type="file" name="A">
* this.file['A'] = A
* this.file_len => 1
*
* For example 3,
* A: <input type="file">
* B: <input type="file">
* C: <input type="file" name="1">
* D: <input type="file" name="D">
* E: <input type="file" name="E">
* this.file[0] => A
* this.file[1] => C
* this.file['D'] => D
* this.file['E'] => E
* this.file_len => 5
*/

