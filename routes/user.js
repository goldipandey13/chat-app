const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const config = require('./../config/config');
const User = require('../models/user');
const passwordCheck = require('../services/passwordCheck');

//email validation
const eValidator = require('email-validator');

//------------------ user registration---------------------//
router.post('/register', (req, res, next) => {
    const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    });

    if (eValidator.validate(newUser.email)) {
        User.addUser(newUser, (err, user) => {
            if (err) {
                res.json({
                    success: false,
                    errorMsg: 'Failed to register user'
                });
            } else if (user === null) {
                res.json({
                    success: false,
                    errorMsg: 'Email already registered'
                });
            } else {
                res.json({
                    success: true,
                    msg: 'Registered Successfully'
                });
            }
        });
    } else {
        if (!eValidator.validate(newUser.email)) {
            res.json({
                success: false,
                errorMsg: 'Enter a valid email'
            });
        } else {
            res.json({
                success: false,
                errorMsg: 'Something went wrong'
            });
        }
    }
});

// ------------------ authentication of user ------------------//
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.getUserByEmail(email, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({
                success: false,
                errorMsg: 'User not found. Please sign-up first.'
            });
        } else if (user) {
            passwordCheck.comparePassword(
                password,
                user.password,
                user,
                (err, info) => {
                    if (err) throw err;
                    if (!info) {
                        res.json({
                            success: false,
                            errorMsg: 'Incorrect password'
                        });
                    } else {
                        res.json({
                            success: true,
                            msg: 'You are now logged in ',
                            user: {
                                email: user.email,
                                name: user.name,
                                token: info,
                            }
                        });
                    }
                }
            );
        }
    });
});


// ------------------ authenticate loggedIn user using token ------------------//
router.post('/tokenCheck', (req, res) => {
    const email = req.body.user.email;
    const loggedUser = jwt.verify(req.body.user.token, config.JWT_SECRET);
    const token = req.body.user.token;
    User.getUserByEmail(email, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({
                success: false,
                errorMsg: 'User not found'
            });
        } else if (user) {
            if (loggedUser.data.password == user.password) {
                res.json({
                    success: true,
                    msg: 'You are now logged in ',
                    user: {
                        email: user.email,
                        name: user.name,
                        token: token,
                    }
                });
            } else {
                res.json({
                    success: false,
                    errorMsg: 'user session expire',
                });
            }
        }
    });
});

router.get('/onlineUsers', (req, res) => {
    res.json(clients);
});

// ------------------ get all register user avilable for chat ------------------//
router.get('/getUsers', (req, res) => {
    User.getUsers(email, (err, users) => {
        if (err) throw err;
        if (!users) {
            return res.json({
                success: false,
                errorMsg: 'User not found'
            });
        } else if (users) {
            res.json({
                success: true,
                users: users,
            });
        }
    });
});

router.get('/usersList', (req, res) => {
    User.find({ isActive: true }, (err, users) => {
        var userList = [];
        if (err) throw err;
        if (users) {
            users.forEach((user) => {
                userList.push({ name: user.name, email: user.email });
            });
        }
        res.json(userList);
    });
});


//Logout redirection API
router.post('/logout', (req, res) => {
    res.json({
        success: true,
        token: false
    });
});

module.exports = router;