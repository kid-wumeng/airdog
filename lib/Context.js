function Context(req, res, data)
{
  this.raw = {}
  this.raw.req = req
  this.raw.res = res
  this.raw.data = data
}



module.exports = Context