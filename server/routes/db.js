var mysql = require('mysql');

var dbpool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'tking',
    database: 'trivia_king',
    password: 'tKingPass4353'
});

const getUser = (username, email) => {
    let sql = "SELECT * FROM ?? WHERE username = ? OR email = ?";
    let query = mysql.format(sql, ["users", username, email]);
    
    return new Promise((resolve, reject) => {
        dbpool.query(query, (error, data) => {
            if (error) {
                console.error(error);
                return reject(error);
            }
            const user = data[0];
            return resolve(user);
        }); 
    });
};

const registerUser = (username, email, hashedPassword, refreshToken) => {
    let sql = "INSERT INTO ?? (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?)";
    let values = [
        "users", "id", "username", "email", "hash", "refresh_token",
        null, username, email, hashedPassword, refreshToken
    ];
    let query = mysql.format(sql, values);
    
    return new Promise ( (resolve,reject) => {
        dbpool.query(query, (error, response) => {
            if (error) {
                console.error(error);
                return reject(error);
            }
            resolve(response.insertId);
        });
    });
};

const storeRefreshToken = (user, refreshToken) => {
    let sql = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
    const values = ["users", "refresh_token", refreshToken, "id", user.id];
    let query = mysql.format(sql, values);

    return new Promise( (resolve, reject) => {
        dbpool.query(query, (error, response) => {
            if (error) {
                console.log(`Error storing token: ${error.message}`);
                return reject(error);
            }
            resolve(response[0]);
        });
    });
};

const getRefreshToken = (user) => {
    let sql = "SELECT ?? FROM ?? WHERE ?? = ?";
    let values = ["refresh_token", "users", "id", user.id];
    let query = mysql.format(sql, values);

    return new Promise( (resolve, reject) => {
        dbpool.query(query, (error, data) => {
            if (error) {
                console.log(`Error getting refresh token ${error.message}`);
                return reject(error);
            }
            resolve(data[0].refresh_token);
        })
    });
};

module.exports = { getUser, registerUser, storeRefreshToken, getRefreshToken };