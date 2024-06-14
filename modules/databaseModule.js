const mongoose = require('mongoose');
require('dotenv').config();

const databaseConnector = mongoose.connect(process.env.MONGO_DB_CONNECTION_URL);

module.exports = {
    databaseConnector
}
