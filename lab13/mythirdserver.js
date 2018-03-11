/**
 * @Author: John Isaacs <john>
 * @Date:   11-Mar-182018
 * @Filename: mythirdserver.js
 * @Last modified by:   john
 * @Last modified time: 11-Mar-182018
 */
 var http = require('http');
 var oneLinerJoke = require('one-liner-joke');

 http.createServer(function (req, res) {
     res.writeHead(200, {'Content-Type': 'text/html'});
    var randomJoke = oneLinerJoke.getRandomJoke();
    res.end(randomJoke.body);
 }).listen(8080);
