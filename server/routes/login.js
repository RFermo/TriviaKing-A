const { verify } = require('jsonwebtoken');
const { hash, compare } = require('bcryptjs');

async function Login(req, res) {
    const { username, password } = req.body;
    const userExists = false;

    // If user exists, check if password matches
    if (userExists) res.send('User already exists');

    try {
        // we pretend here we got the password from the DB and it was correct
        const hasedPassword = await hash(password, 10);

        const passwordMatch = await compare(password, hasedPassword);

        const message = `Attempting to log in as ${username} : ${password} : ${passwordMatch}`;

        console.log(message);
        res.send(message);
    }
    catch (error) {
        res.send(`An error occured: ${error}`);
    }
};

module.exports = Login;