const User = require('../models/user.model.js');

exports.authorized = (req, res, next) => {
  if (req.isAuthenticated()) return next();
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
  return res.send({
    isAuthenticated: true,
    message: 'Logged in!'
  });
}

exports.logout = (req, res) => {
  req.logOut();
  return sendMessage(res, true, 'You have logged out successfully');
}

exports.createProfile = async (req, res) => {
  await createProfile
  return res.send({
    success: true,
    message: 'Profile created'
  })
};

let sendMessage = (res, success, message) => {
  res.send({ success, message });
}