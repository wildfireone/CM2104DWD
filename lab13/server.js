/**
 * @Author: John Isaacs <john>
 * @Date:   11-Mar-182018
 * @Filename: app.js
 * @Last modified by:   john
 * @Last modified time: 11-Mar-182018
 */
 var express = require('express');
 var app = express();

 app.get('/', function(req, res){
    res.send("Hello world! by express");
 });

 app.listen(8080);
