const express = require("express");
const router = express.Router();
const axios = require("axios");

const auth = require("../authenticate");

router.get('/', auth, function(req, res) {

    const token = 'your_auth='+req.cookies.your_auth;

    axios.get("http://localhost:3000/tweet/all", {
        headers: {
            Cookie: token
        }
    })
        .then(response => {
            return res.render("explore", { Tweets: response.data.tweets });

        })
        .catch(error => {
            console.log(error);

        })
});

router.post('/', auth, function(req, res) {

    const token = 'your_auth='+req.cookies.your_auth;
    let body= {
        content: req.body.content
    }

    axios.post("http://localhost:3000/tweet", body, {
        headers: {
            Cookie: token
        }
    })
        .then(response => {
            return res.redirect("/explore");

        })
        .catch(error => {
            console.log(error);

        })

})

module.exports = router;
