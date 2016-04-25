# 0.1.0

* [ new ] - Basic Framework
* [ new ] - Middleware: next
* [ new ] - Dynamic Route
* [ new ] - Server: all, get, post, put, delete, use, listen, close
* [ new ] - Request: url, protocol, host, hostname, port, path, type, get
* [ new ] - Response: body, body=, status, status=, type, type=
* [ new ] - Middleware: Send
* [ new ] - Middleware: FS
* [ new ] - Middleware: Static
* [ new ] - Middleware: BodyParser.Form
* [ new ] - Middleware: BodyParser.JSON
* [ new ] - Middleware: BodyParser.File
* [ new ] - Unit Test System


# 0.2.0

* [ new ] - middleware: Cookie
* [ new ] - middleware: Session
* [ new ] - Render
* [ new ] - Template: hogan
* [ new ] - CORS
* [ new ] - Mock
* [ add ] - Configurable Middleware
* [ add ] - Event: appCreate, appClose, init
* 0.2.1
  * [ add ] The options of this.removeCookie
  * [ fix ] The content-length of response is wrong when the body is multibyte string ( such as Chinese )
  * [ fix ] The consecutive line-break when parse the file-data
  * [ fix ] The join of buffer when handle the data of request