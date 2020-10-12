var express = require('express');
var router = express.Router();
const axios = require("axios");

const auth = require("../authenticate");

router.get('/', auth, function (req, res) {
  const token = 'your_auth='+req.cookies.your_auth;

    axios.get("http://localhost:3000/tweet", {
        headers: {
            Cookie: token
        }
    })
        .then(response => {
            return res.render("dashboard", { Tweets: response.data.tweets });

        })
        .catch(error => {
            console.log(error);

        })
});

module.exports = router;