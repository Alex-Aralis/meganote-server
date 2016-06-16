require('dotenv').load()
var express = require('express');
var db = require('./config/db');
var app = express();

var NoteSchema = db.Schema({
    title: String,
    html_body: String,
});

var Note = db.model('Note', NoteSchema);

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', function(req, res) {
    db.find
});

app.listen(3030, function(){
    console.log(process.env.DB_URI);
    console.log('listening on port 3030');
});


