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


app.use(bodyParser.urlencoded({
  extended: true
}))
// set the view engine to ejs
app.set('view engine', 'ejs');

var db;
var loggedin = false;

MongoClient.connect(url, function(err, database) {
  if (err) throw err;
  db = database;
  app.listen(8080);
  console.log('listening');
});

app.get('/', function(req, res) {
  if(!loggedin){res.redirect('/login')};
  else{
  db.collection('people').find().toArray(function(err, result) {
    if (err) throw err;
    //console.log(result);
    res.render('pages/users', {
      users: result
    })
  });
}
});

app.get('/login', function(req, res) {
  var uname = req.body.username;
  var pword = req.body.password;

  db.collection('people').findOne({"login.username":uname}, function(err, result) {
    if (err) throw err;
    if(result.login.password == pword){ loggedin = true; res.redirect('/') }
    else{res.redirect('/login')}
  });
});

app.get('/profile', function(req, res) {
  if(!loggedin){res.redirect('/login')};
  //get the requested student from the request e.g /students?id=4
  var uname = req.query.username;
  db.collection('people').findOne({
    "login.username": uname
  }, function(err, result) {
    if (err) throw err;
    console.log(uname+ ":" + result);
    res.render('pages/profile', {
      user: result
    })
  });

});
app.get('/adduser', function(req, res) {
  if(!loggedin){res.redirect('/login')};
  res.render('pages/adduser')
});
app.get('/remuser', function(req, res) {
  if(!loggedin){res.redirect('/login')};
  res.render('pages/remuser')
});


app.post('/delete', function(req, res) {
  if(!loggedin){res.redirect('/login')};
  db.collection('quotes').deleteOne(req.body, function(err, result) {
    if (err) throw err;
    res.redirect('/');
  });
});

app.post('/update', function(req, res) {
  if(!loggedin){res.redirect('/login')};
  var query = {
    quote: req.body.quote
  };
  var newvalues = {
    $set: {
      name: req.body.newname,
      quote: req.body.newquote
    }
  };
  db.collection('quotes').updateOne(query, newvalues, function(err, result) {
    if (err) throw err;
    res.redirect('/');
  });
});
