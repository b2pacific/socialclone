const User = require("./models/users");

let auth = function(req, res, next){
    let token = req.cookies.your_auth;


    User.findByToken(token, function(err, user){
        if(err)
            throw err;

        if(!user)
        {
            res.redirect("/login");
        }
        else
        {
            req.token = token;
            req.user = user;
            next();
        }

    })
}

module.exports = auth;