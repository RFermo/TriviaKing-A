module.exports = (app) => {
    const passport = require('../config/passport.config');
    const User = require('../controllers/user.controller.js');
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    app.post('/user/register', User.register);
    app.post('/user/login', passport.authenticate('local'), User.login);
    app.post('/user/login/google', passport.authenticate('google.local'), User.login)
    app.get('/user/isAuthorized', User.isAuthorized)
    app.delete('/user/logout', User.logout);

    app.put('/user/update_profile', User.authorized, User.updateProfile);
    app.get('/user/get_profile', User.authorized, User.getProfile);
    app.get('/user/get_all_profiles', User.authorized, User.getAllProfiles);
    app.get('/user/get_highscores', User.authorized, User.getHighscores);
    
    app.post('/user/protected', User.authorized, User.protected);

};