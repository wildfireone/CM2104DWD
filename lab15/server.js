/**
 * @Author: John Isaacs <john>
 * @Date:   18-Mar-182018
 * @Filename: server.js
 * @Last modified by:   john
 * @Last modified time: 18-Mar-182018
 */



const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/star_wars_quotes";
const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}))
var db;

MongoClient.connect(url, function(err, database) {
  if (err) throw err;
  db = database;
  app.listen(8080);
  console.log('listening');
});



app.get('/all', function(req, res) {
  db.collection('quotes').find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    var output = "<h1>All the quotes</h1>";
    for (var i = 0; i < result.length; i++) {
      output += "<div>"
      output += "<h3>" + result[i].name + "</h3>"
      output += "<p>" + result[i].quote + "</p>"
      output += "</div>"
    }
    res.send(output);
  });
});

app.post('/quotes', function (req, res) {
  console.log(req.body);
  db.collection('quotes').save(req.body, function(err, result) {
    if (err) throw err;
    console.log('saved to database')
    res.redirect('/')
  })
})
