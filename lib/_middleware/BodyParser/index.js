import QueryString from 'querystring'
import Parser from './Parser'


const MIME_FORM = 'application/x-www-form-urlencoded'
const MIME_JSON = 'application/json'
const MIME_FILE = 'multipart/form-data'


// @TODO delay load
module.exports = async function()
{
  this.data = {}
  this.file = {}
  
  switch(this.method){
    case 'GET':
      parseQuery.call(this)
  }
  
  switch(this.type){
    case MIME_FORM: parseForm.call(this); break
    case MIME_JSON: parseJSON.call(this); break
    case MIME_FILE: parseFile.call(this); break
  }
  
  await this.next
}



function parseQuery(){
  let query = this.url.split('?')[1]
  if( query )
    this.data = QueryString.parse(query)
}



function parseForm(){
  this.data = QueryString.parse(this.raw.data)
}



function parseJSON(){
  this.data = JSON.parse(this.raw.data)
}


function parseFile(){
  let [fileBlocks, formBlocks] = Parser.parseData(this)
  Parser.formatForm.call(this, formBlocks)
  Parser.formatFile.call(this, fileBlocks)
}