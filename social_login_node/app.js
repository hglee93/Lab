passport = require('./passport');

const express = require('express');
const app = express();
const routes = require('./routes');
const errorHandlers = require('./middleware/errorhandlers');
const log = require('./middleware/log');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const bodyParser = require('body-parser');
const util = require('./middleware/utilities')
const config = require('./config')
const flash = require('connect-flash')
const partials = require('express-partials');

// View 엔진 설정
app.set('view engine', 'ejs');
app.set('view options', {defaultLayout: 'layout'})

app.use(log.logger);
app.use(partials());
app.use(express.static(__dirname + '/static'));
app.use(cookieParser(config.secret));
app.use(session({
        secret: config.secret,
        saveUninitialized: true,
        resave: true,
        /*store: new RedisStore(
            {url: config.redisUrl})*/
    })
);

app.use(passport.passport.initialize());
app.use(passport.passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(flash());
app.use(util.authenticated)
app.use(util.templateRoutes);


// Routing
app.get('/', routes.index);
app.get(config.routes.login, routes.login);
app.get('/account/login', routes.login);
app.post(config.routes.login, routes.loginProcess);
app.get(config.routes.logout, routes.logOut);
app.get('/stock', [util.requireAuthentication], routes.stock);

app.get('/error', function(req, res, next) {
    console.log(res);
    next(new Error('Error !!!'));
})

passport.routes(app);

app.use(errorHandlers.error);
app.use(errorHandlers.notFound);

app.listen(config.PORT, function() {
    console.log("Hearing Now ! :)");
})

