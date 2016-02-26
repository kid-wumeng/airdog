import QueryString from 'querystring'
import Kit from '../../Kit'


module.exports = async function(){
  if( !this.data ) this.data = {}
  if( !this.file ) this.file = {}
  
  // Parse GET url's query
  if(this.method === 'GET'){
    let query = this.url.split('?')[1]
    if( query ){
      let data = QueryString.parse(query)
      Kit.merge(this.data, data)
    }
  }
  
  // Parse form-data
  if(this.type === 'application/x-www-form-urlencoded'){
    let data = QueryString.parse(this.raw.data)
    Kit.merge(this.data, data)
  }
  
  await this.next
}