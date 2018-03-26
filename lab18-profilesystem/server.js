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
  if(!loggedin){res.redirect('/login');return;}

  db.collection('people').find().toArray(function(err, result) {
    if (err) throw err;
    //console.log(result);
    res.render('pages/users', {
      users: result
    })
  });

});

app.get('/login', function(req, res) {
  res.render('pages/login');
});


app.get('/profile', function(req, res) {
  if(!loggedin){res.redirect('/login');return;}
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
  if(!loggedin){res.redirect('/login');return;}
  res.render('pages/adduser')
});
app.get('/remuser', function(req, res) {
  if(!loggedin){res.redirect('/login');return;}
  res.render('pages/remuser')
});
app.get('/logout', function(req, res) {
  loggedin = false;
  res.redirect('/');
});


app.post('/dologin', function(req, res) {
  console.log(JSON.stringify(req.body))
  var uname = req.body.username;
  var pword = req.body.password;

  db.collection('people').findOne({"login.username":uname}, function(err, result) {
    if (err) throw err;//if there is an error, throw the error
    //if there is no result, redirect the user back to the login system as that username must not exist
    if(!result){res.redirect('/login');return}
    //if there is a result then check the password, if the password is correct set logginin to true and send the user to the index
    if(result.login.password == pword){ loggedin = true; res.redirect('/') }
    //otherwise send them back to login
    else{res.redirect('/login')}
  });
});


app.post('/delete', function(req, res) {
  if(!loggedin){res.redirect('/login');return;}
  db.collection('quotes').deleteOne(req.body, function(err, result) {
    if (err) throw err;
    res.redirect('/');
  });
});

app.post('/update', function(req, res) {
  if(!loggedin){res.redirect('/login');return;}
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
