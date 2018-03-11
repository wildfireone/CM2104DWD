/**
 * @Author: John Isaacs <john>
 * @Date:   11-Mar-182018
 * @Filename: myfirstserver.js
 * @Last modified by:   john
 * @Last modified time: 11-Mar-182018
 */
 var http = require('http');

 http.createServer(function (req, res) {
     res.writeHead(200, {'Content-Type': 'text/html'});
     res.end('Hello World!');
 }).listen(8080);
