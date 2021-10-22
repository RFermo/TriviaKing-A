require('dotenv/config');
const express = require('express');
// const cookieParser = require('cookie-parser');
const cors = require('cors');
// const { verify } = require('jsonwebtoken');
// const { hash, compare } = require('bcryptjs');

const mysql = require('mysql');
const bcrypt = require('bcrypt');

const server = express();

// Middleware for configuration
// server.use(cookieParser());

const corsConfiguration = {
    origin: 'http://localhost:3000',
    credentials: true,
};

server.use(cors(corsConfiguration));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '12ezv34dua56',
    database: 'tklogin'
});

server.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    db.query('INSERT INTO users (username, email, password) VALUES (?,?,?)', [username, email, password],
    (err, result) => {
        if (err) {
            console.log(err);
        }

        else {
            res.send('Values inserted successfully.');
        }
    });
});

server.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], 
    (err, result) => {
        if (err) {
            res.send({err: err})
        }

        if (result.length > 0) {
            res.send(result);
        }

        else {
            res.send({message: 'Wrong username/password combination!'})
        }
    });
});



server.listen(process.env.PORT, () =>
    console.log(`TriviaKing backend server (Express)\nPort: ${process.env.PORT}`)
);