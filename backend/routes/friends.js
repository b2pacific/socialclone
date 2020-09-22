var express = require('express');
var router = express.Router();
const User = require("../models/users");
const Friend = require("../models/friendship");
const auth = require("../authenticate");

router.get('/', auth, function (req, res, next) {
    Friend.findOne({
        userid: req.user._id
    }).populate('friends').exec(function (error, friends) {
        if (!friends)
            res.json({
                message: "No friends"
            });

        return res.json({
            friends: friends
        })
    })
});

router.post('/', auth, function (req, res, next) {
    const friend = req.body.friend;

    User.findOne({
        username: friend
    }, function (error, user) {

        if (!user)
            return res.err(error);

        Friend.findOne({
            userid: req.user._id
        }, function (error, friend) {

            if (!friend)
                return res.err(error);

            friends = friend.friends;

            friends.push(user._id);

            Friend.findOneAndUpdate({
                "_id": friend._id
            }, {
                "friends": friends
            }, {
                upsert: true
            }, function (err, friend) {
                if (err)
                    return res.err(err);
                return res.json({
                    message: "Successfull"
                });
            })
        })
    })

})


router.post('/unfriend', auth, function (req, res, next) {
    const friend = req.body.friend;

    User.findOne({
        username: friend
    }, function (error, user) {

        if (!user)
            return res.err(error);

        Friend.findOne({
            userid: req.user._id
        }, function (error, friend) {

            if (!friend)
                return res.err(error);

            friends = friend.friends;

            friends.filter(function(value, index, arr){ return value!=user._id;});

            Friend.findOneAndUpdate({
                "_id": friend._id
            }, {
                "friends": friends
            }, {
                upsert: true
            }, function (err, friend) {
                if (err)
                    return res.err(err);
                return res.json({
                    message: "Successfull"
                });
            })
        })
    })

})

module.exports = router;