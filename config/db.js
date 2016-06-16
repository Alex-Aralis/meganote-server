var db = require('mongoose');

db.connect('mongodb://localhost:27017/meganote');

module.exports = db;
