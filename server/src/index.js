require('dotenv/config');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { verify } = require('jsonwebtoken');

const server = express();

// Middleware for configuration
server.use(cookieParser());

const corsConfiguration = {
    origin: 'http://localhost:3000',
    credentials: true,
}

server.use(cors(corsConfiguration))
server.use(express.json());
server.use(express.urlencoded({ extended: true }))

// Routes
const registerRoute = require('../Routes/register');
const loginRoute = require('../Routes/login');

server.post('/register', registerRoute);
server.post('/login', loginRoute); 

// Server
server.listen(process.env.PORT, () =>
    console.log(`TriviaKing backend server (Express)\nPort: ${process.env.PORT}`)
)