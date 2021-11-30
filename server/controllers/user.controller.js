const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_SECRET)
const User = require('../models/user.model.js');


exports.authorized = (req, res, next) => {
  if (req.user) return next();
  return res.send({
    success: false,
    message: 'You are not logged in'
  });
};

exports.isAuthorized = (req, res) => {
  return res.send({ isAuthenticated: req.isAuthenticated() });
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

  if (exists) return sendMessage(res, false, exists.message);
  await User.register(user)
    .then(data => data)
    .catch(error => sendMessage(res, false, error))

  const id = await User.findOne(user)
    .then(data => data.id)
    .catch(error => sendMessage(res, false, 'Error looking up user'))

  await User.createProfile(id)
    .then(data => sendMessage(res, true, 'User registered'))
    .catch(error => sendMessage(res, false, 'Failed to register user'))
}

exports.protected = async (req, res) => {
  res.send('You have reached the procted area');
}

exports.login = async (req, res) => {
  console.log(`model.user.login sending successful login!`);
  return res.send({
    isAuthenticated: true,
    message: 'Logged in!'
  });
}

exports.logout = (req, res) => {
  req.logOut();
  return sendMessage(res, true, 'You have logged out successfully');
}

exports.updateProfile = async (req, res) => {
  const profile = req.body;
  await User.updateProfile(req.user.id, profile)
    .then(data => sendMessage(res, true, 'Profile udpated'))
    .catch(error => {
      console.log(`Error: ${error}`)
      sendMessage(res, false, 'Failed to Update Profile')
    })
};

exports.getProfile = async (req, res) => {
  await User.getProfileById(req.user.id)
    .then(data => sendMessage(res, true, data))
    .catch(error => sendMessage(res, false, 'Failed to get profile'));
}

exports.getAllProfiles = async (req, res) => {
  await User.getAllProfiles()
    .then(data => sendMessage(res, true, data))
    .catch(error => sendMessage(res, false, 'Failed to get profiles'))
}

exports.getHighscores = async (req, res) => {
  await User.getHighscores()
    .then(data => sendMessage(res, true, data))
    .catch(error => sendMessage(res, false, error));
}

let sendMessage = (res, success, message) => {
  res.send({ success, message });
}

