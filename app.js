var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send('hallu');
});

app.listen(3030, function(){
    console.log('listening on port 3030');
});


