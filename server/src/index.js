require('dotenv/config');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { verify } = require('jsonwebtoken');
const { hash, compare } = require('bcryptjs');

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

server.listen(process.env.PORT, () =>
    console.log(`TriviaKing backend server (Express)\nPort: ${process.env.PORT}`)
)