const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./../config/config');

module.exports.comparePassword = function (candidatePassword, hash, user, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) {
            errorMsg = 'Some Error occured! Please try again!';
            callback(errorMsg);
        }
        if (isMatch) {
            const token = jwt.sign({
                data: user
            }, config.JWT_SECRET, {
                    expiresIn: 604800 //1-week
                });
            callback(null, token);
        } else {
            callback();
        }
    });
}