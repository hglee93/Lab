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
app.use(session({
 secret: '@#@$MYSIGN#@$#$',
 resave: false,
 saveUninitialized: true
}));

var router = require('./router/main')(app, fs);