import request from './request'
import response from './response'


class Context {
  
  constructor( req, res ){
    this.raw = {}
    this.raw.req = req
    this.raw.res = res
    this.extends( request, ['verb','path'] )
  }
  
  extends( proto, props ){
    props.forEach(function( prop ){
      let desc = Object.getOwnPropertyDescriptor( proto, prop )
      Object.defineProperty( this, prop, desc )
    }.bind(this))
  }
}


module.exports = Context