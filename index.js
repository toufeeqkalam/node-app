'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));

var constants = require('./config/config');
var port = constants.APP_PORT || 4000;

var MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect(constants.MONGO_DB, { useNewUrlParser: true } ,function (err, client) {
    if(err){
        return console.log(err);
    }else{
        db = client.db('star-wars-quotes');
        app.listen(port, function () {
            console.log('Listening on port: ' + port)
        });
    }

});

app.get('/hello', function (req, res) {
    res.send('Hello NodeJS!')
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});

app.post('/quotes', function (req, res, err) {
   db.collection('quotes').insertOne(req.body, function (err, result) {
       if(err){
           return console.log(err)
       }else{
           console.log('Saved to database');
           res.redirect('/');
       }

   });
});