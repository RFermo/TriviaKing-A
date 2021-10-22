const Protected = (req, res) => {
    const { id } = req.user;
    res.send(`You are logged in as user id: ${id}`);
};

module.exports = Protected;