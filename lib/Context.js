import request from './request'
import response from './response'


class Context {
  
  constructor( req, res ){
    this.raw = {}
    this.raw.req = req
    this.raw.res = res
    
    this.extends( request, ['verb','path'] )
  }


  
  /**
   * Extends some properties from a prototype to context.
   *
   * @param { Object } proto
   * @param { Array < String > } props - Which properties will be extended.
   */

  extends( proto, props ){
    props.forEach(function( prop ){
      // Get desc of proto's prop
      let desc = Object.getOwnPropertyDescriptor( proto, prop )
      // Create context's prop with the desc
      Object.defineProperty( this, prop, desc )
    }.bind(this))
  }
  
}


module.exports = Context