const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs');
const { findOne, findById } = require('../models/user.model');

passport.use(new LocalStrategy(
    async (username, password, done) => {
        const user = { username, password, email: null }

        const foundUser = await findOne(user)
            .then(data => data)
            .catch(error => {
                console.log(`An error occurred:\n${error}`);
                return done(error);
            });

        console.log(`foundUser has been set to: ${foundUser}`)

        if (!foundUser) {
            return done(null, false, { message: `Invalid Username` });
        }

        await bcrypt.compare(user.password, foundUser.hash)
            .then(authenticated => {
                if (!authenticated) done(null, false, `Invalid Password`);
                return done(null, foundUser)
            })
            .catch(error => done(error, false, `Error occured at login`))
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    await findById(id)
        .then(user => done(null, user))
        .catch(error => done(error))
})

module.exports = passport;