const User = require('../models/user.model.js');

exports.authorized = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.send({
        success: false,
        message: 'You are not logged in'
    });
};

exports.findOne = async (req, res) => {
    const user = req.body;
    await User.findOne(user)
        .then(data => res.send({ token: data.refresh_token }))
        .catch(error => { console.log(`Failed to find user: \n ${error}`) });
}

exports.register = async (req, res) => {
    const user = req.body;
    const exists = await User.isTaken(user);

    if (exists) {
        res.send(`${exists.message}`);
        return;
    }
    await User.register(user)
        .then(data => res.send({
            success: true,
            message: `User ${user.username} has been registered`
        }))
        .catch(error => res.send({ message: `${error}` }))
}

exports.protected = async (req, res) => {
    res.send('You have reached the procted area');
}

exports.login = async (req, res) => {
    return res.send(req.user);
}

exports.logout = (req, res) => {
    req.logOut();
    return res.send('You have logged out successfully');
}