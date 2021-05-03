var router = require('express').Router();

const stock_passport = require('../passport');
const util = require('../middleware/utilities')
const config = require('../config');

// 로그인
router.get('/login', login);

// 로그아웃
router.get('/logout', logout);

// Google 로그인
router.get('/google', stock_passport.google_authentication());
router.get('/google/callback', stock_passport.google_authentication_callback());

// Kakao 로그인
router.get('/kakao', stock_passport.kakao_authentication());
router.get('/kakao/callback', stock_passport.kakao_authentication_callback());

// Login Function
function login (request, response) {
    response.render('login', {
        title: 'Login', 
        message: request.flash('error')
    });
}

// Login Process Function
function loginProcess (request, response) {
    let isAuth = util.auth(request.body.username, request.body.password, request.session);
    if (isAuth) {
        response.redirect('/stock');
    } else {
        request.flash('error', 'Wrong Username or Password');
        response.redirect(config.routes.login);
    }
}

// Logout Function
function logout (request, response) {
    util.logOut(request);
    response.redirect('/');
}

module.exports = router;