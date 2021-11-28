const mysql = require('mysql');
const db = require('../db/connect');

const dbQuery = (sql, values) => {
    let query = mysql.format(sql, values);
    return new Promise( (resolve, reject) => {
        db.query(query, (error, data) => {
            if (error) return reject(error);
            resolve(data[0]);
        });
    });
};

const dbQueryAll = (sql, values) => {
    let query = mysql.format(sql, values);
    return new Promise( (resolve, reject) => {
        db.query(query, (error, data) => {
            if (error) return reject(error);
            resolve(data);
        });
    });
};

module.exports = {dbQuery, dbQueryAll};