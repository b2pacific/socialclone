var express = require('express');
var router = express.Router();
const User = require("../models/users");

router.get('/', function(req, res) {
    if(req.cookies.your_auth)
        res.redirect("/explore");
    else
        res.render("login");
});

router.post('/', function(req, res) {
    const username=req.body.username;
    const password=req.body.password;

    console.log(req.body);
    

    User.findOne({username: username}, function(error, user) {
        if(!user)
            return res.redirect('/login');
        
        user.comparePassword(password, function(err, isMatch) {
            if(!isMatch)
                return res.redirect('/login');

                user.generateToken(function (err, user) {
                    if (err)
                      return res.json({
                        error: err
                      });
                    else {
                    return res.cookie("your_auth", user.token)
                               .redirect("/explore")
                    }
                })
        })
    })
    
})

module.exports = router;
