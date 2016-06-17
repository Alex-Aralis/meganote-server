require('dotenv').load()
var express = require('express');
var bodyParser = require('body-parser');
var db = require('./config/db');
var app = express();

var NoteSchema = db.Schema({
    title: String,
    body_html: String,
    body_text: String,
    update_at: { type: Date, default: Date.now, },
});

var Note = db.model('Note', NoteSchema);

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(bodyParser.json());

app.get('/', function(req, res) {
    Note.find()
        .then(function(notes){
            res.json(notes);
            console.log('sending res');
    });
});

app.get('/:id', function(req,res){

    Note.find({_id: req.params.id})
        .then(function(notes){
            res.json(notes);
    }); 
});

app.post('/', function(req, res){
    var note = new Note(req.body);
    res.json(note);
    note.save();
}); 

app.delete('/:id', function(req,res){
    Note.find({_id: req.params.id})
        .remove().exec();

    res.json({msg:'note deleted', _id: req.params.id});
});

app.patch('/:id', function(req, res){
    Note.update({_id: req.params.id}, req.body, {}, function(err){
        res.json(err);
    });
});

app.listen(3030, function(){
    console.log(process.env.DB_URI);
    console.log('listening on port 3030');
});


