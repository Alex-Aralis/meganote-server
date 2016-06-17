require('dotenv').load();
var db = require('mongoose');

console.log(process.env.DB_URI);
db.connect(process.env.DB_URI);

module.exports = db;
