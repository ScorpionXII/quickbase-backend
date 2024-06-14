const axios = require('axios');
require('dotenv').config();

const githubApiBaseUrl = 'https://api.github.com';
// Task Requirement: GitHub Token can be provided via ENV_VAR
const githubToken = process.env.GITHUB_TOKEN;

const getUser = async (username) => {
    return axios.get(`${githubApiBaseUrl}/users/${username}`, { headers: { Authorization: `Bearer ${githubToken}` }})
        .catch((error) => {
                throw error.response.data;
        });
}

module.exports = {
    getUser
}
