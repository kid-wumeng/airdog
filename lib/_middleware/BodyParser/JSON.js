import Kit from '../../Kit'


const JSON_MIME =


module.exports = async function(){
  if( !this.data ) this.data = {}
  if( !this.file ) this.file = {}

  // Parse json-data
  if(this.type === 'application/json'){
    let data = JSON.parse(this.raw.data)
    Kit.merge(this.data, data)
  }
  
  await this.next
}