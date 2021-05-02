const passport = require('passport');
const google = require('passport-google-oauth').OAuth2Strategy;
const kakao = require('passport-kakao').Strategy;
const config = require('../config');
const social_login_config = require('../config/social-login-config.json');

passport.serializeUser(function (user, done) {
    done(null, user.id);
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
        console.log(accessToken);
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

var routes = function routes(app){
    app.get(config.routes.googleAuth, passport.authenticate('google',
        { scope: ['https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email'] }));
    app.get(config.routes.googleAuthCallback, passport.authenticate('google',
        {successRedirect: config.routes.stock, failureRedirect: config.routes.login, failureFlash: true}));
    app.get(config.routes.kakaoAuth, passport.authenticate('kakao'));
    app.get(config.routes.kakaoAuthCallback, passport.authenticate('kakao',
        {successRedirect: config.routes.stock, failureRedirect: config.routes.login, failureFlash: true}));
};

exports.passport = passport;
exports.routes = routes;
