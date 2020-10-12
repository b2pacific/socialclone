var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  if(req.cookies.your_auth)
        res.redirect("/explore");
    else
        res.render("login");
});

module.exports = router;
