/**
 * @Author: John Isaacs <john>
 * @Date:   11-Mar-182018
 * @Filename: mythirdserver.js
 * @Last modified by:   john
 * @Last modified time: 11-Mar-182018
 */
 var http = require('http');
 var knockknock = require('knock-knock-jokes')

 http.createServer(function (req, res) {
     res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(knockknock());  
 }).listen(8080);
