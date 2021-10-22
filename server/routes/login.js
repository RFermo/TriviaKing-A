const { hash, compare } = require('bcryptjs');
const { getUser, storeRefreshToken, getRefreshToken } = require('../routes/db');
const { 
    createAccessToken, createRefreshToken,
    sendAccessToken, sendRefreshToken
} = require('./tokens');

const genericLoginMessage = 'Failed to login';

const Login = async (req, res) => {
    const { username, password } = req.body;
    
    const user = await getUser(username, null)
    .then ( response => {
        if (!response) res.send({ message: genericLoginMessage});
        return response;
    })
    .catch( error => {
        console.error(error);
        return res.send({ message: `An error occured: ${error}`});
    });
    if (!user) return; // if user undefined, return

    const authenticated = await compare(password, user.hash)
    .then( result => result)
    .catch( error => res.send({ message: `check password error: ${error}`}));
   
    if (!authenticated) return res.send(genericLoginMessage);
    
    const {id, email} = user;
    const accessToken = createAccessToken({id, email});
    const refreshToken = createRefreshToken({id, email});
    
    // Create access/refresh tokens, store refresh, then send both
    storeRefreshToken(user, refreshToken);
    sendRefreshToken(res, refreshToken);
    sendAccessToken(res, user, accessToken);
};

module.exports = Login;