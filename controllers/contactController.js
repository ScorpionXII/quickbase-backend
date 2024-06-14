const github = require('../modules/githubModule');
const freshdesk = require('../modules/freshdeskModule');
const Contact = require('../models/contactModel');

/**
 * Gets a single Contact if a valid id is provided, otherwise returns a list with all Contacts
 * @param req Request Object
 * @param req.params Request Parameters, expected id or empty
 */
const getContact = async (req, res) => {
    try {
        const { id } = req.params;
        const query = (id) ? { _id: id } : {};

        const allContacts = await Contact.find(query).exec();
        res.send(allContacts);
    } catch (error) {
        res.send(error);
    }
}

/**
 * Creates a Contact on Freshdesk combining data from a GitHub User and stores in our tracking Database
 * @param req Request Object
 * @param req.body Request Payload, expected JSON with key { githubUsername }
 */
const createContact = async (req, res) => {
    try {
        const { githubUsername } = req.body;

        const githubUserData = (await github.getUser(githubUsername)).data;
        
        const storedContact = await Contact.findOne({ username: githubUserData.login }).exec();

        if (!storedContact) {
             const freshdeskContact = assembleFreshdeskContact(githubUserData);
             const freshdeskContactData = (await freshdesk.createContact(freshdeskContact)).data;
             const combinedContact = assembleCombinedContact(githubUserData, freshdeskContactData);
             const newContact = new Contact(combinedContact);
             await newContact.save();
             res.send(newContact);
        } else {
            console.log('This contact is already on our database!');
            res.send(storedContact);
        }
    } catch (error) {
        res.send(error);
    }
}

/**
 * Updates an existing Contact on Freshdesk and in our tracking Database
 * @param req Request Object
 * @param req.body Request Payload, expected JSON with key { githubUsername }
 */
const updateContact = async (req, res) => {
    try {
        const { githubUsername } = req.body;

        const githubUserData = (await github.getUser(githubUsername)).data;

        const storedContact = await Contact.findOne({ username: githubUserData.login });

        if (!storedContact) {
            res.send({ message: `Contact not found in the database with username: ${githubUsername}` });
        } else {
            const freshdeskContact = assembleFreshdeskContact(githubUserData);
            await freshdesk.updateContact(storedContact.freshdesk_id, freshdeskContact);
            storedContact.name = githubUserData.name;
            storedContact.email = githubUserData.email || 'None';
            storedContact.location = githubUserData.location;
            await storedContact.save();
            res.send(storedContact);
        }
    } catch (error) {
        console.log(error);
        console.log("Here");
        res.send(error);
    }
}

/**
 * Auxiliary Function | Assembles and returns a compatible Freshdesk API Contact
 * @param githubUserData User data retrieved from GitHub API
 */
const assembleFreshdeskContact = (githubUserData) => {
    return {
        unique_external_id: githubUserData.id,
        name: githubUserData.name,
        address: githubUserData.location,
        email: githubUserData.email || null
    }
}

/**
 * Auxiliary Function | Assembles and returns a Combined Contact to store it in our tracking Database
 * @param githubUserData User data retrieved from GitHub API
 * @param freshdeskContactData Contact data retrieved from Freshdesk API
 */
const assembleCombinedContact = (githubUserData, freshdeskContactData) => {
    return {
        github_id: githubUserData.id,
        name: githubUserData.name,
        username: githubUserData.login,
        email: githubUserData.email || 'None',
        location: githubUserData.location,
        freshdesk_id: freshdeskContactData.id
    }
}

module.exports = {
    getContact,
    createContact,
    updateContact
}
