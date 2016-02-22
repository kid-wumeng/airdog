import QueryString from 'querystring'



const MIME_FORM = 'application/x-www-form-urlencoded'
const MIME_JSON = 'application/json'



module.exports = async function(){
  if( this.method === 'GET' ){
    parseQuery.call(this)
  }
  switch(this.type){
    case MIME_FORM: parseForm.call(this); break
    case MIME_JSON: parseJSON.call(this); break
  }
  await this.next
}



function parseQuery(){
  let query = this.url.split('?')[1]
  if( query )
    this.data = QueryString.parse(query)
}



function parseForm(){
  // @TODO convert complex struct
  // @TODO convert value's type
  this.data = QueryString.parse(this.raw.data)
}



function parseJSON(){
  this.data = JSON.parse(this.raw.data)
}