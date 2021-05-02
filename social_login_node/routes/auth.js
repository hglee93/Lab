var express = require('express');
var router = express.Router();
const util = require('../middleware/utilities')

router.get('/login', login);
router.get('/logout', logOut);

function login (request, response) {
    console.log("login");
    response.render('login', {title: 'Login', message: request.flash('error')});
}

function loginProcess (request, response) {
    let isAuth = util.auth(request.body.username, request.body.password, request.session);
    if (isAuth) {
        response.redirect('/stock');
    } else {
        request.flash('error', 'Wrong Username or Password');
        response.redirect(config.routes.login);
    }
}

function logOut (request, response) {
    util.logOut(request);
    response.redirect('/');
}

module.exports = router;