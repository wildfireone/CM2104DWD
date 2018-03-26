/**
 * @Author: John Isaacs <john>
 * @Date:   18-Mar-182018
 * @Filename: server.js
 * @Last modified by:   john
 * @Last modified time: 27-Mar-182018
 */



const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/profiles";
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser')
const app = express();

//this tells express we are using sesssions. These are variables that only belong to one user of the site at a time.
app.use(session({ secret: 'example' }));

app.use(bodyParser.urlencoded({
  extended: true
}))
// set the view engine to ejs
app.set('view engine', 'ejs');

var db;


//this is our connection to the mongo db, ts sets the variable db as our database
MongoClient.connect(url, function(err, database) {
  if (err) throw err;
  db = database;
  app.listen(8080);
  console.log('listening on 8080');
});


//this is our root route
app.get('/', function(req, res) {
  //if the user is not logged in redirect them to the login page
  if(!req.session.authenticated){res.redirect('/login');return;}

  //otherwise perfrom a search to return all the documents in the people collection
  db.collection('people').find().toArray(function(err, result) {
    if (err) throw err;
    //the result of the query is sent to the users page as the "users" array
    res.render('pages/users', {
      users: result
    })
  });

});

//this is our login route, all it does is render the login.ejs page.
app.get('/login', function(req, res) {
  res.render('pages/login');
});

//this is our profile route, it takes in a username and uses that to search the database for a specific user
app.get('/profile', function(req, res) {
  if(!req.session.authenticated){res.redirect('/login');return;}
  //get the requested user based on their username, eg /profile?username=dioreticllama
  var uname = req.query.username;
  //this query finds the first document in the array with that username.
  //Because the username value sits in the login section of the user data we use login.username
  db.collection('people').findOne({
    "login.username": uname
  }, function(err, result) {
    if (err) throw err;
    //console.log(uname+ ":" + result);

    res.render('pages/profile', {
      user: result
    })
  });

});
app.get('/adduser', function(req, res) {
  if(!req.session.authenticated){res.redirect('/login');return;}
  res.render('pages/adduser')
});
app.get('/remuser', function(req, res) {
  if(!req.session.authenticated){res.redirect('/login');return;}
  res.render('pages/remuser')
});
app.get('/logout', function(req, res) {
  req.session.authenticated = true;
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
    //if there is a result then check the password, if the password is correct set session authenticated to true and send the user to the index
    if(result.login.password == pword){ req.session.authenticated = true; res.redirect('/') }
    //otherwise send them back to login
    else{res.redirect('/login')}
  });
});


app.post('/delete', function(req, res) {
  if(!req.session.authenticated){res.redirect('/login');return;}
  db.collection('quotes').deleteOne(req.body, function(err, result) {
    if (err) throw err;
    res.redirect('/');
  });
});

app.post('/update', function(req, res) {
  if(!req.session.authenticated){res.redirect('/login');return;}
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
