const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs');
const { findOne, findById, findByEmail, verifyToken, createGoogleProfile } = require('../models/user.model');

passport.use('local', new LocalStrategy(
  async (username, password, done) => {
    const user = { username, password, email: null }
    const foundUser = await findOne(user)
      .then(data => data)
      .catch(error => {
        console.log(`An error occurred:\n${error}`);
        return done(error);
      });
    if (!foundUser) {
      return done(null, false, { message: `Invalid Username` });
    }
    await bcrypt.compare(user.password, foundUser.hash)
      .then(authenticated => {
        if (!authenticated) done(null, false, `Invalid Password`);
        return done(null, foundUser)
      })
      .catch(error => done(error, false, `Error occurred at login`))
  }
));

passport.use('google.local', new LocalStrategy(
  { passwordField: 'token' },
  async (username, password, done) => {
    try {
      const email = await verifyToken(password);
      let user = await findByEmail(email);
      if (typeof user === 'undefined') user = await createGoogleProfile(email);
      return done(null, user);
    } catch (error) {
      console.log(`Error in Strategy:\n${error}`);
      return done(error, false, `Error occurred at login`)
    }
  }
));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  await findById(id)
    .then(user => done(null, user))
    .catch(error => done(error))
});

module.exports = passport;