var express = require("express");
var router = express.Router();
const User = require("../models/users");
const Tweet = require("../models/tweets");
const auth = require("../authenticate");
const Friend = require("../models/friendship");

router.get("/", auth, function (req, res) {
  Tweet.find({ author: req.user._id }, function (error, tweets) {
    if (!tweets)
      res.json({
        message: "No tweets",
      });

    return res.json({
      tweets: tweets,
    });
  });
});

router.get("/all", auth, function (req, res) {
  let friend = req.user.friends;

  Friend.findOne({ _id: friend }, function (err, friend) {
    let friends = friend.friends;

    Tweet.find({}, function (err, tweets) {
      if (!tweets)
        return res.json({
          message: "No tweets",
        });

        let result = [];

        for(var i = 0; i<tweets.length; i++)
        {
            if(friends.includes(tweets[i].author))
            {
                result.push(tweets[i])
            }
        }

      return res.json({
        tweets: result,
      });
    });
  });
});

router.post("/", auth, function (req, res) {
  const cont = req.body.content;

  const tweet = new Tweet({
    author: req.user._id,
    content: cont,
  });

  tweet.save(function (err, tweet) {
    if (err) return res.err(err);

    User.findOne({ _id: req.user._id }, function (error, user) {
      if (!user) return res.err(error);

      var tweets = user.tweets;
      tweets.push(tweet._id);

      User.findOneAndUpdate(
        { _id: req.user._id },
        { tweets: tweets },
        { upsert: true },
        function (err, user) {
          if (err) return res.err(err);
          return res.json({
            message: "Successfull",
          });
        }
      );
    });
  });
});

module.exports = router;
