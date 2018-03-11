/**
 * @Author: John Isaacs <john>
 * @Date:   11-Mar-182018
 * @Filename: myfirstserver.js
 * @Last modified by:   john
 * @Last modified time: 11-Mar-182018
 */
 var http = require('http');
 var currentdate = require('./mymodule');

 http.createServer(function (req, res) {
     res.writeHead(200, {'Content-Type': 'text/html'});
     res.write("The date and time are currently: " + currentdate.myDateTime());
     res.end('Hello World!');
 }).listen(8080);
