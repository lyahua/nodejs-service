var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 数据库连接
require('./model/connect')

var app = express()

app.get('/test',(req,res)=>{
  res.send("ttttt")
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// api 规范，路由中间件
var version = '/api/v1'
// app.use(version, require('./routes/index'));
app.use(version+'/user', require('./routes/users'));
// app.use(version, require('./routes/users'));

app.use(version+'/jd', require('./routes/webapp/jd'))

app.use(version+'/good', require('./routes/cms/good'))
app.use(version+'/upload', require('./routes/cms/upload'))
app.use(version+'/ad', require('./routes/cms/ad'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
