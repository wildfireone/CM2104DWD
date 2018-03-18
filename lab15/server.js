/**
 * @Author: John Isaacs <john>
 * @Date:   18-Mar-182018
 * @Filename: server.js
 * @Last modified by:   john
 * @Last modified time: 18-Mar-182018
 */

 var express = require('express');
 var app = express();
app.use(express.static('public'))

 app.get('/', function(req, res){
    res.send("Hello world! by express");
 });

 app.get('/test', function(req, res){
   res.send("this is route 2");
});

app.get('/add', function(req, res){
var x = req.query.x;
var y = req.query.y;
   res.send("X + Y="+(x+y));
});

app.get('/getform', function(req, res){
var name = req.query.name;
var quest = req.query.quest;
   res.send("Hi "+name+" I am sure you will "+quest) ;
});
 app.listen(8080);
 
// const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb://localhost:27017/star_wars_quotes";
// const express = require('express');
// const app = express();
// app.use(express.static('public'));
// // var db;
// //
// // MongoClient.connect(url, function(err, database) {
// //   if (err) throw err;
// //   db = database;
// //
// //
// // });
//
//
//
// app.get('/', function(req, res) {
//   console.log('req');
//   db.collection('quotes').find({}).toArray(function(err, result) {
//     if (err) throw err;
//     var output = "";
//     for (var i = 0; i < result.length; i++) {
//       output += "<h2>" + result[i].name + "</h2>"
//       output += "<p>" + result[i].quote + "<p>"
//     }
//     res.send(output);
//   });
// });
// app.listen(8080);
// console.log('listening');
