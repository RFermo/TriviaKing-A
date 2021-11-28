var mysql = require('mysql');

let dbConfig = {
    connectionLimit: 100,
    host: 'localhost',
    user: 'root', // was 'tking'
    database: 'trivia_king',
    password: '12ezv34dua56' // was tKingPass4353
};

var database = mysql.createPool(dbConfig);

module.exports = database;