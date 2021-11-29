var mysql = require('mysql');

let dbConfig = {
    connectionLimit: 100,
    host: 'localhost',
    user: 'tking',
    database: 'trivia_king',
    password: 'tKingPass4353'
};

var database = mysql.createPool(dbConfig);

module.exports = database;