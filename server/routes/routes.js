module.exports = (app) => {
    const passport = require('../config/passport.config');
    const User = require('../controllers/user.controller.js');
    app.use(passport.initialize());
    app.use(passport.session());
    
    app.post('/user/register', User.register);
    app.post('/user/login', passport.authenticate('local'), User.login);
    app.get('/user/isAuthorized', User.isAuthorized)
    app.delete('/user/logout', User.logout);
    app.get('/user/find/', User.findOne);
    app.post('/user/protected', User.authorized, User.protected);
};