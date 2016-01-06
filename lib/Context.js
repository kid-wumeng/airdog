import toolkit from './toolkit'
import Request from './Request'
import response from './response'




class Context {
  
  constructor( req, res ){
    this.raw = {}
    this.raw.req = req
    this.raw.res = res
    
    this.req = new Request(req, res)
    
    toolkit.delegate(this, this.req)
      .getter('verb')
      .getter('path')
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
      // Create context's prop with the desc
      Object.defineProperty( this, prop, {
        get(){
          return proto[prop]
        }
      })
    }.bind(this))
  }
  
}


module.exports = Context