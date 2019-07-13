const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    name: {
        type: String
    }
});

const User = (module.exports = mongoose.model('User', UserSchema));

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};

module.exports.getUserByEmail = function (email, callback) {
    const query = { email: email }
    User.findOne(query, callback);
};

module.exports.addUser = function (newUser, callback) {
    const query = {
        email: newUser.email
    };
    User.findOne(query, function (err, exist) {
        if (err) callback(err);
        else if (!exist) {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save(callback);
                });
            });
        } else {
            callback(null, null);
        }
    });
};
