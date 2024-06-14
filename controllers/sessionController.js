const User = require("../models/userModel");

/**
 * Performs Login operation
 * @param req Request Object
 * @param req.body Request Payload, expected JSON with keys { email, password }
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // TODO: Add validations
        
        const user = await User.findOne({ email });

        if (user && user.passwordMatch(password)) {
            req.session.user = { userId: user.id, username: user.username };
            res.send({ 
                message: 'Authentication performed successfully!',
                loggedUser: req.session.user
            });
        } else {
            res.status(401).send({
                message: 'Username or password incorrect!'
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

/**
 * Performs Logout operation destroying the active session
 */
const logout = (req, res) => {
    try {
        const user = req.session.user;

        if (user) {
            req.session.destroy();
            res.clearCookie(process.env.SESSION_NAME);
            res.send({ message: 'Session destroyed successfully!' });
        } else {
            res.send({message: 'There is not any user logged in!'})
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

/**
 * Checks if session is still valid and returns the logged User for informative purposes
 */
const checkSession = (req, res) => {
    try {
        if(req.session.userId && req.session.name) {
            res.send({ 
                message: 'Session is still valid!',
                loggedUser: req.session.user
            });
        } else {
            res.send({ message: 'Session authentication required!' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    login,
    logout,
    checkSession
}
