import Kit from '../../Kit'


const JSON_MIME =


module.exports = async function(){
  // Parse json-data
  if(this.type === 'application/json'){
    let data = JSON.parse(this.raw.data)
    Kit.merge(this.data, data)
  }
  
  await this.next
}