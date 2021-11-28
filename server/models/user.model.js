const dbQuery = require("../db/query.js");
const bcrypt = require('bcryptjs');

exports.findOne = async (user) => {
  const { username, email } = user;
  let sql = "SELECT * FROM ?? WHERE username = ? OR email = ?";
  let values = ["users", username, email];
  return await dbQuery(sql, values);
};

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

exports.createProfile = async(userId) => {
  let sql = "INSERT INTO ?? (??) values (?)";
  let values = ["profile", "id", userId];
  return await dbQuery(sql, values);
};