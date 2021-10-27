const { verify } = require('jsonwebtoken');
const { clearRefreshToken } = require('../routes/db');

async function Logout(_req, res) {
    res.clearCookie('refreshtoken', { path: '/refresh_token' });
    res.clearCookie('accesstoken', {path: '/'});
    res.clearCookie('auth');
    return res.send({ message: 'You have logged out'});
};

module.exports = Logout;