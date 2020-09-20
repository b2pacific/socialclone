var express = require('express');
var router = express.Router();
const User = require("../models/users");

router.post('/', function(req, res, next) {
    const username=req.body.username;
    const password=req.body.password;
    const firstname=req.body.firstname;
    const lastname=req.body.lastname;

    var user = new User({
        firstName: firstname,
        lastName: lastname,
        username: username,
        password: password
    })

    user.save(function (err, user) {
        if (err)
          res.json({
            error: err
          })
        else {
          res.json({
            message: "done",
            user: user
          });
        }
    })
    
})

module.exports = router;
