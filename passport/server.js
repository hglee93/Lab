var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs")

// View 페이지 폴더 설정
app.set('views', __dirname + '/views');

// View 엔진 설정
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// 서버 오픈
var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
});

// View 정적 파일 설정
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// express-session 설정
/*app.use(session({
 secret: '@#@$MYSIGN#@$#$',
 resave: false,
 saveUninitialized: true
}));*/

// Passport 설정
var passport = require('passport'),
 LocalStrategy = require('passport-local').Strategy;

// passport 설치
app.use(passport.initialize());
// passport-session 사용
app.use(passport.session());

passport.serializeUser(function(user, done) {
    //done(null, user.id);
    done(null, user.name);
});

passport.deserializeUser(function(id, done) {
    /*User.findById(id, function(err, user) {
        done(err, user);
    });*/
});

app.post('/login_process',
    passport.authenticate('local', { 
        successRedirect: '/',
        failureRedirect: '/login' 
    }));

passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'pw'
    },
    function(username, password, done) {

        console.log('LocalStrategy', username, password, __dirname);

        var data = fs.readFileSync(__dirname + "/data/user.json", "utf8");
        var users = JSON.parse(data);

        if(!users[username]){
            // USERNAME NOT FOUND
            return done(null, false, { 
                message: 'Incorrect username.' 
            });
        }

        if(users[username]["password"] == password){
            done(null, users[username]);
        } else{
            return done(null, false, { 
                message: 'Incorrect password.' 
            });
        }
    }
));

var router = require('./router/main')(app, fs);