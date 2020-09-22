var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Users = require("../models/users")
var auth = require("../authenticate");

router.get('/', auth, function (req, res, next) {
    Users.findOneAndUpdate({
        _id: req.user._id
    }, {
        token: ""
    }, function (err, user) {
        if (err)
            res.redirect("/login");
        else {
            res.clearCookie("your_auth")
                .redirect("/login");
        }
    })
});

module.exports = router;