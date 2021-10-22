const { sign, verify } = require('jsonwebtoken');
const { getUser, storeRefreshToken } = require('../routes/db');

const createAccessToken = user => {
    return sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
};

const createRefreshToken = user => {
    return sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '5d' });
};

const sendAccessToken = (res, user, accessToken) => {
    res.send({
        accessToken,
        user: user.username,
        email: user.email
    });
};

const sendRefreshToken =  (res, refreshToken) => {
    res.cookie('refreshtoken', refreshToken, {
        httpOnly: true,
        path: '/refresh_token'
    });
};

// User with Route post '/refresh_token'
// if refresh token valid, return new access token
const refreshToken = async (req, res) => {
    const token = req.cookies.refreshtoken;
    
    let payload = null;
    try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        return res.send({accessToken: ''});
    }

    let payloadEmail = payload.email;
    const user = await getUser("", payloadEmail);
    
    if (!user) return res.send({ accessToken: ''});
    if (user.refresh_token !== token) return res.send({ accessToken: ''});

    const { id, email } = user;
    const accessToken = createAccessToken({ id, email });
    const refreshToken = createRefreshToken({id, email});
    
    storeRefreshToken(user, refreshToken);
    sendRefreshToken(res, refreshToken);
    sendAccessToken(res, user, accessToken);
};

// Middleware Authorize token: verifying that token is legit
const authToken = (req, res, next) => {
    const authHeaders = req.headers['authorization'];
    const token = authHeaders && authHeaders.split(' ')[1];
    if (!token) return res.sendStatus(401);

    verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) return res.sendStatus(403);
        if (!user) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

module.exports = {
    createAccessToken,
    createRefreshToken,
    authToken,
    refreshToken,
    sendAccessToken,
    sendRefreshToken
};