var router = require('express').Router();

const stock_passport = require('../passport');
const util = require('../middleware/utilities')
const config = require('../config');
const url = require('url');

// 로그인
router.get('/login', login);
router.get('/login/success', login_success);
router.get('/login/failure', login_success);

// 로그아웃
router.get('/logout', logout);

// Google 로그인
router.get('/google', stock_passport.google_authentication());

router.get('/google/callback', stock_passport.google_authentication_callback());

// Kakao 로그인
router.get('/kakao', stock_passport.kakao_authentication());
router.get('/kakao/callback', stock_passport.kakao_authentication_callback());

// Login Function
function login (req, res) {
    var queryData = url.parse(req.url, true).query;
    var referer = req.header('Referer');
    referer = referer.substring(0, referer.length - 1);

    req.session.success_redirect_uri = referer + queryData.success_redirect_uri;
    req.session.failure_redirect_uri = referer + queryData.failure_redirect_uri;

    switch(queryData.provider) {
        case "google":
            res.redirect('/auth/google');
            break;

        case "kakao":
            res.redirect('/auth/kakao');
            break;
    }
}

function login_success(req, res) {
    res.redirect(req.session.success_redirect_uri);
}

function login_failure(req, res) {
    res.redirect(req.session.failure_redirect_uri);
}

// Logout Function
function logout (request, response) {
    util.logOut(request);
    response.redirect('/');
}

module.exports = router;