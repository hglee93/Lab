const util = require('../middleware/utilities');
const config = require('../config');

module.exports.index = index;
module.exports.login = login;
module.exports.loginProcess = loginProcess;
module.exports.logOut = logOut;
module.exports.stock = stock;

function index (req, res) {
    res.render('index', {
        title: 'This.Index'
    });
}

function login (req, res) {
    console.log(req.body);
    res.render('login', {title: 'Login', message: req.flash('error')});
}

function loginProcess (req, res) {
    let isAuth = util.auth(req.body.username, req.body.password, req.session);
    if (isAuth) {
        res.redirect('/stock');
    } else {
        req.flash('error', 'Wrong Username or Password');
        res.redirect(config.routes.login);
    }
}

function logOut (req, res) {
    util.logOut(req);
    res.redirect('/');
}

function stock (req, res) {
    res.json({
        'result': 'true',
        'status': '200',
        'route': 'stock'
    })
}