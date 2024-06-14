const express = require('express');
const sessionController = require('../controllers/sessionController')
const router = express.Router();

/**
 * Route to checks if session is still valid, more details at sessionController
 */
router.get('/checkSession', sessionController.checkSession);

/**
 * Route for Login operation, more details at sessionController
 */
router.post('/login', sessionController.login);

/**
 * Route for Logout operation, more details at sessionController
 */
router.delete('/logout', sessionController.logout);

module.exports = router;
