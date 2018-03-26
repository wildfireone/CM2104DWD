/**
 * @Author: John Isaacs <john>
 * @Date:   18-Mar-182018
 * @Filename: server.js
 * @Last modified by:   john
 * @Last modified time: 26-Mar-182018
 */



const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/profiles";
const express = require('express');
const bodyParser = require('body-parser')
const app = express();


app.use(bodyParser.urlencoded({extended: true}))
// set the view engine to ejs
app.set('view engine', 'ejs');

var db;

MongoClient.connect(url, function(err, database) {
  if (err) throw err;
  db = database;
  app.listen(8080);
  console.log('listening');
});

app.get('/', function(req,res) {
  db.collection('students').find().toArray(function(err, result) {
    if (err) throw err;
    res.render('pages/students', {students:result})
  });
});

app.get('/student', function(req,res) {
//get the requested student from the request e.g /students?id=4
var studentID = req.body.id;
db.collection('students').find({_id:studentID}).toArray(function(err, result) {
  if (err) throw err;
  res.render('pages/student', {student:result})
});

});
app.get('/delete', function(req,res) {
res.render('pages/delete')
});
app.get('/update', function(req,res) {
res.render('pages/update')
});



app.get('/allquotes', function(req, res) {
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
  db.collection('quotes').save(req.body, function(err, result) {
    if (err) throw err;
    console.log('saved to database')
    res.redirect('/')
  })
})

app.post('/search', function(req, res) {
  db.collection('quotes').find(req.body).toArray(function(err, result) {
    if (err) throw err;

    var output = "<h1>quotes by" +req.body.name+ "</h1>";

    for (var i = 0; i < result.length; i++) {
      output += "<div>"
      output += "<h3>" + result[i].name + "</h3>"
      output += "<p>" + result[i].quote + "</p>"
      output += "</div>"
    }
    res.send(output);
  });
});

app.post('/delete', function(req, res) {
  db.collection('quotes').deleteOne(req.body, function(err, result) {
    if (err) throw err;
    res.redirect('/');
  });
});

app.post('/update', function(req, res) {
  var query = { quote: req.body.quote };
  var newvalues = { $set: {name: req.body.newname, quote: req.body.newquote } };
  db.collection('quotes').updateOne(query,newvalues, function(err, result) {
    if (err) throw err;
    res.redirect('/');
  });
});
