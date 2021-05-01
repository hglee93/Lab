const config = require('../config');

module.exports.csrf = function csrf (req, res, next) {
    res.locals.token = req.csrfToken();
    next();
}

module.exports.authenticated = function authenticated(req, res, next){
    // 세션이 인증됐는지 확인
    req.session.isAuthenticated = (req.session.passport !== undefined && req.session.passport.user !== undefined);
    res.locals.isAuthenticated = req.session.isAuthenticated;
    if (req.session.isAuthenticated) {
        res.locals.user = req.session.passport.user;
    }
    next();
};

module.exports.requireAuthentication = function requireAuthentication(req, res, next) {
    if (req.session.isAuthenticated) {
        next();
    } else {
        res.redirect(config.routes.login);
    }
}

module.exports.auth = function auth(username, password, session) {
    const isAuth = username == 'leejp';

    if (isAuth) {
        session.isAuthenticated = isAuth;
        session.user = {username: username};
    }

    return isAuth;
}

module.exports.logOut = function logOut (req) {
    req.session.isAuthenticated = false;
    req.logout();
}

exports.templateRoutes = function templateRoutes (req, res, next) {
    res.locals.routes = config.routes;
    next();
}