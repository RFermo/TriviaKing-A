const { verify } = require('jsonwebtoken');

async function Logout(_req, res) {
    res.clearCookie('refreshtoken', { path: '/refresh_token' });
    return res.send({ message: 'You have logged out'});
};

module.exports = Logout;