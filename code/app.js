var express = require('express');
var path = require('path');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require("connect-flash");

var routeIndex = require("routes/index");

var configs = require("./configs");

var app = express();

// 设置模板
app.set('views', path.join(__dirname, 'views'));// 设置存放模板文件的目录
app.set('view engine', 'ejs');// 设置模板引擎为 ejs

// 设置静态文件目录
app.use(express.static(path.join(__dirname, "public")));

// session 中间件
app.use(cookieParser()); // 测试用
app.use(session({
    name: configs.session.key,
    secret: configs.session.secret, // 建议使用 128 个字符的随机字符串
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: configs.session.maxAge
    },
    store: new MongoStore({// 将 session 存储到 mongodb
        url: config.mongodb// mongodb 地址
    })
}));

app.use(flash()); // 用来显示通知
// app.use(function (req, res, next) {
//     res.locals.supplies = req.flash('supplies');
//     next();
// });

// 路由
routeIndex(app);

// 测试
app.get("/", function(req, res) {
    console.log("------------------------------------------------------");
    if(req.session.isVisit) {
        req.session.isVisit++;
        res.send('<p>第 ' + req.session.isVisit + '次来此页面</p>');
    } else {
        req.session.isVisit = 1;
        res.send("欢迎第一次来这里");
        console.log(req.session);
    }
    console.log("cookies", req.cookies);
});

module.exports = app;