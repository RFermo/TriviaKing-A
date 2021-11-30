// Environment variables
require('dotenv/config');

const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const corsConfiguration = {
  origin: 'http://localhost:3000',
  credentials: true,
};

const cors = require('cors');
app.use(cors(corsConfiguration));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const session = require('express-session');
app.use(session(({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: true
})));

// Routes
const routes = require('../routes/routes');
routes(app);

// app
app.listen(process.env.PORT, () => {
  console.log(`TriviaKing backend app (Express)`);
  console.log(`URL: http://localhost:${process.env.PORT}`);
});