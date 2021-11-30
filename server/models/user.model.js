const { dbQuery, dbQueryAll } = require("../db/query.js");
const bcrypt = require('bcryptjs');

const generator = require('generate-password');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_SECRET)


exports.findOne = async (user) => {
  const { username, email } = user;
  let sql = "SELECT * FROM ?? WHERE username = ? OR email = ?";
  let values = ["users", username, email];
  return await dbQuery(sql, values);
};

exports.findByEmail = async (email) => {
  let sql = "SELECT * FROM ?? WHERE email = ?";
  let values = ["users", email];
  return await dbQuery(sql, values);
}

exports.findById = async (id) => {
  let sql = "SELECT * FROM ?? WHERE id = ?";
  let values = ["users", id];
  return await dbQuery(sql, values);
}

exports.register = async (user) => {
  const { username, email, password, refreshToken } = user;
  const hash = await bcrypt.hash(password, 10);
  let sql = "INSERT INTO ?? (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?)";
  let values = [
    "users", "id", "username", "email", "hash", "refresh_token",
    null, username, email, hash, refreshToken
  ];
  return await dbQuery(sql, values);
};

exports.registerGoogle = async (email) => {
  const atIndex = email.indexOf('@');
  const username = email.substring(0, atIndex);

}

exports.exists = async (user) => {
  return await exports.findOne(user)
    .then(data => data ? true : false)
    .catch(error => error);
};

exports.isTaken = async (user) => {
  return await exports.findOne(user)
    .then(data => {
      if (!data) return false;
      if (data.email === user.email) return {
        message: `Email ${user.email} is taken`
      };
      if (data.username === user.username) return {
        message: `Username ${user.username} is taken`
      };
    })
    .catch(error => error);
};

exports.createProfile = async (userId) => {
  let sql = "INSERT INTO ?? (??) values (?)";
  let values = ["profile", "id", userId];
  return await dbQuery(sql, values);
};

exports.getProfileById = async (userId) => {
  let sql = "SELECT ??.??, ??.* FROM ??, ?? WHERE ??.?? = ??.?? AND ??.?? = ?";
  let values = [
    "users", "username", "profile", "users", "profile",
    "users", "id", "profile", "id", "users", "id", userId];
  return await dbQuery(sql, values);
};

exports.getAllProfiles = async () => {
  let sql = "SELECT *, ?? FROM ??, ??"
  let values = ["profile"];
  return await dbQueryAll(sql, values);
};

exports.updateProfile = async (userId, profile) => {
  let sql = "UPDATE ?? SET ";
  const length = Object.keys(profile).length - 1;
  Object.keys(profile).forEach((key, index) => {
    sql += `${key} = ${profile[key]}`
    if (index < length) sql += ', ';
    else sql += ' ';
  })
  sql += `WHERE ?? = ?`;
  values = ["profile", "id", userId];
  return await dbQuery(sql, values);
};

exports.getHighscores = async () => {
  let sql = "SELECT ??.??, ??.?? FROM ??, ?? WHERE ??.?? = ??.??";
  let values = [
    "users", "username", "profile", "highscore", "users", "profile",
    "users", "id", "profile", "id"
  ];
  return await dbQueryAll(sql, values);
};

// Takes in token, returns a user if in the 'users' database
exports.verifyToken = async (token) => {
  try {
    const response = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_SECRET
    })
    const { email } = response.getPayload();
    return email;
  } catch (error) {
    console.log(`Error verifying token:\n${error}`)
    return Error(`Error at Login`)
  }
}

exports.createGoogleProfile = async (email) => {
  const username = email.substring(0, email.indexOf('@'));
  const password = generator.generate({ length: 8, numbers: true, strict: true });
  const user = { email, username, password, refreshToken: '' };
  await exports.register(user);
  const createdUser = await exports.findOne(user);
  await exports.createProfile(createdUser.id);
  return createdUser;
}