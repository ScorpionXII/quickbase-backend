const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    github_id: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    location: {
        type: String,
    },
    freshdesk_id: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;
