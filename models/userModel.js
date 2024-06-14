const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        validate: {
            validator: username => User.notExist({ username }),
            message: 'Username already exists!'
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: email => User.notExist({ email }),
            message: 'Email already exists!'
        }
    },
    password: {
        type: String,
        required: true
    }
}, { timestamp: true });

UserSchema.pre('save', function () {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 10);
    }
});

UserSchema.methods.passwordMatch = function (providedPassword) {
    return bcrypt.compareSync(providedPassword, this.password);
}

UserSchema.statics.notExist = async function (field) {
    return await this.where(field).countDocuments() === 0;
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
