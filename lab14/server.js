/**
 * @Author: John Isaacs <john>
 * @Date:   11-Mar-182018
 * @Filename: server.js
 * @Last modified by:   john
 * @Last modified time: 12-Mar-182018
 */
 var express = require('express');
 var app = express();
 var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'vPuzIzncL5b5HyyUMp99kbMwv',
  consumer_secret: 'yKbWuC6TupPNzIJP0NnNXVxLn1D8BDprijakencUG3bAGMize5',
  access_token_key: '14812487-PNs6GC8wpgeAG2W7szRt4ZvpTA7lYBes6mORd9KDT',
  access_token_secret: 'Tjy5TrQ5c5YVLA6q2cb7LeoDty7bHIg0HmbDELgMwMCHG'
});


 app.use(express.static('public'))

 app.get('/', function(req, res){
   var params = {screen_name: 'nodejs'};
   client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for(var tweet in tweets){
      console.log(tweet)
      res.send("<h2>"+tweet.user.screen_name+"<h2>");
      res.send("<p>"+tweet.text+"</p>");
    }

  }
});


 });

app.listen(8080);
