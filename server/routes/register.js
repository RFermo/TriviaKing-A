const { verify } = require('jsonwebtoken');
const { hash } = require('bcryptjs');
const { registerUser, getUser } = require('../routes/db');

const Register = async (req, res) => {
    const { email, username, password } = req.body;

    if ( !validLoginLength(username, password) ) {
        return res.send({ message: "Invalid User/Pass Length" });
    }

    const user = await getUser(username, email)
    .then (result => result )
    .catch (error => { return error});
    
    if (userExists(req, res, user)) return;
    try {
        const hashedPassword = await hash(password, 10);
        registerUser(username, email, hashedPassword, "");
        return res.send({ message: `User ${username} has been created`});
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
            res.send({ message: `Email ${email} is taken`});
            return true;
        };
        if ( user.username === username ) {
            res.send({ message: `Username ${username} is taken`});
            return true;
        };
    }
    return false;
};

const validLoginLength = (username, password) => {
    if ( !validLength(username, 4) ) return false;
    if ( !validLength(password, 4) ) return false; 
    return true;
}

const validLength = (word, length) => {
    if (word.length < length) return false;
    return true;
}


module.exports = Register;