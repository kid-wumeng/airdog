import Kit from '../../Kit'


const JSON_MIME =


module.exports = async function(){

  // Parse json-data
  if(this.type === 'application/json'){
    ready.call(this)
    
    let data = JSON.parse(this.raw.data)
    Kit.merge(this.data, data)
  }
  
  await this.next
}



function ready(){
  if( !this.data ) this.data = {}
  if( !this.file ) this.file = {}
}