var express = require('express');
var bodyParser = require('body-parser');
var db = require('./config/db');
var app = express();
var sanitizeHtml = require('sanitize-html');
var htmlToText = require('html-to-text');

var port = Number(process.env.PORT) || 8080;

console.log(port);

var NoteSchema = db.Schema({
    title: String,
    body_html: String,
    body_text: String,
    update_at: { type: Date, default: Date.now, },
});

NoteSchema.pre('save', function(next){
    console.log('running pre save');

    this.body_html = sanitizeHtml(this.body_html);
    this.body_text = htmlToText.fromString(this.body_html);
    this.update_at = Date.now();
    
    next();
});

var Note = db.model('Note', NoteSchema);

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    next();
});

app.use(bodyParser.json());

app.get('/', function(req, res) {
    Note.find().sort({ update_at: -1})
        .then(function(notes){
            res.json(notes);
            console.log('sending res');
    });
});

app.get('/:id', function(req,res){
    Note.findOne({_id: req.params.id}).then(function(note){
        res.json(note);
    });
});

app.post('/', function(req, res){
    var note = new Note(req.body);
    res.json(note);
    note.save();
}); 

app.delete('/:id', function(req,res){
    Note.findOne({_id: req.params.id})
        .remove().exec(function(err, note){
            if(err){
                res.status(404).json(err);    
            }else{
                res.json({msg:'deletion successful', _id:req.params.id});
            }
        });
});

app.patch('/:id', update);
app.put('/:id', update);

function update(req, res){
    Note.findOne({_id: req.params.id}, function(err, note){
        if(err){
            res.status(404).json(err);
        }else{
            if(req.body.title) note.title = req.body.title;
            if(req.body.body_html) note.body_html = req.body.body_html;

            note.save(function(err){
                if(err){
                    res.status(501).json(err);
                }else{
                    res.json({msg: 'update sucessful', _id: req.params.id});
                }
            });
        }
    });
}

app.listen(port, function(){
    console.log('listening on port' + port);
});


