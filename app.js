'use strict';
require('rootpath')();
var jwt = require('jsonwebtoken');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var auth = require('auth');
var useragent = require('express-useragent');
var appRouter = require('./routes/route');
var fileUpload = require('express-fileupload');
var bodyParser =require('body-parser');
var logServices = require('./utils/logService')
 var app = express();

 //notification   
//  var fcm = require('fcm-notification');
//  var FCM = new fcm ('privatekey.json');

app.use(cors('*'));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// view engine setup
app.set('views', path.join(__dirname + '/v1', 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(logger('dev'));
app.use(express.json());
//app.use(fileUpload());
app.use(fileUpload({
  limits: { fileSize:'5mb' },
}));
app.use(useragent.express());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
  app.use('/micro/api/v1', appRouter);
//Health Checkup
app.use('/micro/api/v1/health',(req,res) =>{
  res.send("OK");
  })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
 // next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
  console.error(err.stack)
  console.log(logServices.severityCritical)
  logServices.log(logServices.severityCritical, 'app.js', err.message,err.stack );

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});








module.exports = app;
