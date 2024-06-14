const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

/**
 * Route to create a User for login purposes, more details at userController
 */
router.post('/', userController.create);

module.exports = router;
