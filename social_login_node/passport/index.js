const passport = require('passport');
const google = require('passport-google-oauth').OAuth2Strategy;
const kakao = require('passport-kakao').Strategy;
const config = require('../config');
const social_login_config = require('../config/social-login-config.json');

passport.serializeUser(function (user, done) {
    done(null, user);
})

passport.deserializeUser(function (user, done) {
    done(null, user);
})

passport.use(new google({
        clientID: social_login_config.google.clientID,
        clientSecret: social_login_config.google.clientSecret,
        callbackURL: 'http://localhost:2004/auth/google/callback'
    },
    function (accessToken, refreshToken, profile, done) {
        done(null, profile);
    })
);

passport.use(new kakao({
        clientID: social_login_config.kakao.clientID,
        callbackURL: config.routes.kakaoAuthCallback
    },
    async (accessToken, refreshToken, profile, done) => {
        done(null, profile);
    })
);

function google_authentication() {
    return passport.authenticate('google',{ 
        scope: ['https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email']
    });
}

function google_authentication_callback() {
    return passport.authenticate('google', {
        successRedirect: '/auth/login/success', 
        failureRedirect: '/auth/login/failure', 
        failureFlash: true
    });
}

function kakao_authentication() {
    return passport.authenticate('google',{ 
        scope: ['https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email']
    });
}

function kakao_authentication_callback() {
    return passport.authenticate('google',{
        successRedirect: config.routes.stock, 
        failureRedirect: config.routes.login, 
        failureFlash: true
    });
}

function initialize() {
    return passport.initialize();
}

function session() {
    return passport.session();
}

module.exports.initialize = initialize;
module.exports.session = session;
module.exports.google_authentication = google_authentication;
module.exports.google_authentication_callback = google_authentication_callback;
module.exports.kakao_authentication = kakao_authentication;
module.exports.kakao_authentication_callback = kakao_authentication_callback;
