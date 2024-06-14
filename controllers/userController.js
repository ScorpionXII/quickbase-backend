const User = require('../models/userModel');

/**
 * Creates a User for login purposes
 * @param req Request Object
 * @param req.body Request Payload, expected JSON with keys { username, email, password }
 */
const create = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });
        await newUser.save();
        
        res.send({userId: newUser.id, username: newUser.username });
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = { 
    create
}
