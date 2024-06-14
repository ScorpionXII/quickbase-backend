/**
 * A simple Authentication Middleware to implement session-based security
 */
const authCheck = (req, res, next) => {
    if (!req.session.user) {
        res.status(401).send({
            message: 'Authentication is required for this endpoint!'
        });
    } else {
        next();
    }
}

module.exports = authCheck;
