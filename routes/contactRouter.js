const express = require('express');
const contactController = require('../controllers/contactController');
const authCheck = require('../middlewares/authCheckMiddleware')
const router = express.Router();

/**
 * Route to get all the Contacts, more details at contactController
 */
router.get('/', authCheck, contactController.getContact)

/**
 * Route to get a single Contact, more details at contactController
 */
router.get('/:id', authCheck, contactController.getContact)

/**
 * Route to create a Contact, more details at contactController
 */
router.post('/', authCheck, contactController.createContact);

/**
 * Route to update a Contact, more details at contactController
 */
router.put('/', authCheck, contactController.updateContact);

module.exports = router;
