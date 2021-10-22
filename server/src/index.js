require('dotenv/config');
const express = require('express');

const cookieParser = require('cookie-parser');
const cors = require('cors');
const { verify } = require('jsonwebtoken');
const { authToken, refreshToken } = require('../routes/tokens');

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
const registerRoute = require('../routes/register');
const loginRoute = require('../routes/login');
const logoutRoute = require('../routes/logout');
const protectedRoute = require('../routes/protected');

server.post('/register', registerRoute);
server.post('/login', loginRoute);
server.post('/logout', logoutRoute);
server.post('/refresh_token', refreshToken);
server.post('/protected', authToken, protectedRoute);

// Server
server.listen(process.env.PORT, () =>
    console.log(`TriviaKing backend server (Express)\nURL: http://localhost:${process.env.PORT}`)
)