var express = require('express');
var router = express.Router();
const User = require("../models/users");
const Friend = require("../models/friendship");

router.post('/', function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  var user = new User({
    firstName: firstname,
    lastName: lastname,
    username: username,
    password: password
  })

  user.save(function (err, user) {
    if (err)
      return res.json({
        error: err
      })
    else {
      var friend = new Friend({
        userid: user._id,
        friends: []
      })

      friend.save(function (err, friend) {
        if (err)
          return res.json({
            erros: err
          })

        else {

          User.findOneAndUpdate({
            _id: friend.userid
          }, {
            friends: friend._id
          }, {
            upsert: true
          }, function (err, userr) {
            if (err)
              return res.json({
                errors: err
              })

            res.json({
              message: "done",
              user: userr
            });

          })

        }
      })

    }
  })

})

module.exports = router;