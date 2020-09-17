var express = require('express');
var router = express.Router();
const User = require("../models/users");

router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res, next) {
    const username=req.body.username;
    const password=req.body.password;

    User.findOne({username: username}, function(user, error) {
        if(!user)
            res.redirect('/login');
        
        user.comparePassword(password, function(err, isMatch) {
            if(!isMatch)
                res.redirect('/login');

        })
    })
    
})

module.exports = router;
