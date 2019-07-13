var express = require('express');
var router = express.Router();
var app = express();

var Chat = require('../models/chat.js');

// -------------------- get all chats -------------------------//
router.get('/:group', function (req, res, next) {
    Chat.find({ group: req.params.group }, function (err, chats) {
        if (err) return next(err);
        res.json(chats);
    });
});

// -------------------- get group name is already present -------------------------//
router.get('/findGroup/:selectedMember/:loggedInMember', function (req, res, next) {
    const group = req.params.selectedMember + req.params.loggedInMember;
    Chat.find({ group: group }, function (err, chats) {
        if (err) return next(err);
        if (chats.length > 0) {
            res.json({ group: group });
        } else {
            const group = req.params.loggedInMember + req.params.selectedMember;
            Chat.find({ group: group }, function (err, chats) {
                if (err) return next(err);
                if (chats.length > 0) {
                    res.json({ group: group });
                } else {
                    res.json({ group: null });
                }
            });
        }
    });
});


// -------------------- save chats -------------------------//
router.post('/', function (req, res, next) {
    Chat.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;