"use strict"

let s = new Airdog({})

s.get('/', function(){
  // this.setCookie('name', 'kid', 100)
  // this.setCookie('age', 18, 100)
  // this.removeCookie()
  this.body = '12345678'
})

s.listen(8080)


let co1 = request.cookie('connect.sid=s%3A4JfNgKfLSr0-K8Ji1n_YK04-bkCp_p0C.ea6omQeCCaIkmArYmS8lGsYAujWlg%2FoABkWPILI4lms')
let co2 = request.cookie('_ga=GA1.2.538501538.1449730977')
let co3 = request.cookie('_gat=1')
let co4 = request.cookie('CNZZDATA1254020586=1490713588-1449728736-https%253A%252F%252Fwww.google.com.hk%252F%7C1457015113')
var j = request.jar()
j.setCookie(co1, 'http://127.0.0.1:8080/')
j.setCookie(co2, 'http://127.0.0.1:8080/')
j.setCookie(co3, 'http://127.0.0.1:8080/')
j.setCookie(co4, 'http://127.0.0.1:8080/')


// request.get({
//   url: 'http://127.0.0.1:8080/',
//   jar: j
// }, function(err, res, body){
//   // s.close()
// })

