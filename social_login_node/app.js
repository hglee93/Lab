const stock_passport = require('./passport');
const express = require('express');
const app = express();
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
var cors = require('cors');

// CORS 설정
app.use(cors());

// View 엔진 설정
// app.set('view engine', 'ejs');
// app.set('view options', {defaultLayout: 'layout'})

//app.use(log.logger);
app.use(partials());
app.use(express.static(__dirname + '/static'));

app.use(cookieParser(config.secret));
app.use(session({
        secret: config.secret,
        saveUninitialized: true,
        resave: true,
        store: new RedisStore({
            url: config.redisUrl,
            port: 6379
        })
    })
);

// passport 설정
app.use(stock_passport.initialize());
app.use(stock_passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(flash());
app.use(util.authenticated)
app.use(util.templateRoutes);

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var stockRouter = require('./routes/stock');

// Routing
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/stock', stockRouter);

app.get('/error', function(req, res, next) {
    console.log(res);
    next(new Error('Error !!!'));
})

app.use(errorHandlers.error);
app.use(errorHandlers.notFound);

app.listen(config.PORT, function() {
    console.log("Hearing Now ! :)");
})