/**
 * @Author: John Isaacs <john>
 * @Date:   25-Mar-182018
 * @Filename: server.js
 * @Last modified by:   john
 * @Last modified time: 25-Mar-182018
 */



// server.js
// load the things we need
var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});

// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.listen(8080);
console.log('8080 is the magic port');
