var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
        // res.render('login', { title: '欢迎登录' });
        res.send(req.flash());
});

router.get('/:name', function(req, res) {
    // req.flash('supplies', ["mp", "hp", "exp"]);
    res.render("users", {
        name: req.params.name,
        supplies: ["mp", "hp", "exp"]
    });
});

module.exports = router;