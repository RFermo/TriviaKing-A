const { verify } = require('jsonwebtoken');
const { hash } = require('bcryptjs');

async function Register(req, res) {
    const { username, password } = req.body;

    // check if user already exists, if not
    // register user
    try {
        const message = `You are trying to register\n${username}:${password}`;
        const hashedPassword = await hash(password, 10);
        console.log(message);
        res.send(message);
    }
    catch (error) {
        console.log(`There was some error: ${error}`)
    }
};

module.exports = Register;