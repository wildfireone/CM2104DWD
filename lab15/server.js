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
var db;

MongoClient.connect(url, function(err, database) {
  if (err) throw err;
  db = database;
  app.listen(8080);
});



app.get('/', function(req, res) {
  db.collection('quotes').find().toArray(function(err, result) {
    if (err) throw err;
    var output = "";
    for (var i = 0; i < result.length; i++) {
      output += "<h2>" + result[i].name + "</h2>"
      output += "<p>" + result[i].quote + "<p>"
    }
    res.send(output);
  });
});
