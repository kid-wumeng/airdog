exports.sleep = function(ms){
  return new Promise(function(resolve){
    setTimeout(resolve, ms)
  })
}



class Flag {
  constructor(n){
    this.n = n
    this.marks = []
  }
}

Flag.prototype.mark = function(i){
  i !== undefined ?
    this.marks.push(i)
  : this.marks.push(0)
}

Flag.prototype.assert = function(){
  this.marks.length.should.equal(this.n)
  this.marks.forEach(function(val, i){
    val.should.equal(i+1)
  })
}

exports.Flag = Flag