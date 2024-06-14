const axios = require('axios');
require('dotenv').config();

// Task Requirement: Freshdesk Organization and Token can be provided via ENV_VARS
const freshdeskApiBaseUrl = process.env.FRESHDESK_ORG_API_URL;
const freskdeskToken = process.env.FRESHDESK_TOKEN;

const createContact = async (contact) => {
    return axios.post(`https://${freshdeskApiBaseUrl}/contacts`, contact, { auth: { username: freskdeskToken }})
        .catch((error) => {
            throw error.response.data;
        });
}

const updateContact = async (id ,contact) => {
    return axios.put(`https://${freshdeskApiBaseUrl}/contacts/${id}`, contact, { auth: { username: freskdeskToken }})
        .catch((error) => {
            throw error.response.data;
        });
}

module.exports = {
    createContact,
    updateContact
}
