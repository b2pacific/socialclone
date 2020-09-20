var express = require('express');
var router = express.Router();
const User = require("../models/users");

router.get('/', function(req, res, next) {
    User.find({}, function(err, users) {
        if(users.length == 0)
            return res.json({
                message: "No users"
            })

        // if(error)
        //     res.err(error);

        return res.json({
                users: users
            });
    })
});

module.exports = router;
