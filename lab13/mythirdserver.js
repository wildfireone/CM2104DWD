/**
 * @Author: John Isaacs <john>
 * @Date:   11-Mar-182018
 * @Filename: mythirdserver.js
 * @Last modified by:   john
 * @Last modified time: 11-Mar-182018
 */
 var http = require('http');
 var asart = require('asciify');

 http.createServer(function (req, res) {
     res.writeHead(200, {'Content-Type': 'text/html'});
    asart.asciify('Hello World!', function(err, textres){ 
      res.end(textres);
  });
 }).listen(8080);
