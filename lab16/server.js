/**
 * @Author: John Isaacs <john>
 * @Date:   23-Mar-182018
 * @Filename: server.js
 * @Last modified by:   john
 * @Last modified time: 23-Mar-182018
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
    res.render('index');
});

app.get('/', function(req, res) {
    var drinks = [
        { name: 'Bloody Mary', drunkness: 3 },
        { name: 'Martini', drunkness: 5 },
        { name: 'Scotch', drunkness: 10 }
    ];
    var tagline = "Commit messages are memory.";

    res.render('index', {
        drinks: drinks,
        tagline: tagline
    });
});

// about page
app.get('/about', function(req, res) {
    res.render('about');
});

app.listen(8080);
console.log('8080 is the magic port');
