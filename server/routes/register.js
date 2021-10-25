const { verify } = require('jsonwebtoken');
const { hash } = require('bcryptjs');
const { registerUser, getUser } = require('../routes/db');

const Register = async (req, res) => {
    const { email, username, password } = req.body;

    const user = await getUser(username, email)
    .then (result => result )
    .catch (error => { return error});
    
    if (userExists(req, res, user)) return;
    try {
        const hashedPassword = await hash(password, 10);
        registerUser(username, email, hashedPassword, "");
        return res.send({ message: "User created"});
    }
    catch (error) {
        return res.send({
            message: `Error registering user: ${error}`}
        );
    };
};

const userExists = (req, res, user) => {
    const { username, email } = req.body;
    if (user) {
        if ( user.email === email ) {
            res.send({ message: "Email is taken!"});
            return true;
        };
        if ( user.username === username ) {
            res.send({ message: "Username is taken!"});
            return true;
        };
    }
    return false;
};

module.exports = Register;