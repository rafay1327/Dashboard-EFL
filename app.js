var path          = require('path');
var db            = require('diskdb');
var multer        = require('multer');
var logger        = require('morgan');
var express       = require('express');
var bodyParser    = require('body-parser');
var cookieParser  = require('cookie-parser');
var favicon       = require('serve-favicon');
var xlstojson     = require("xls-to-json-lc");
var xlsxtojson    = require("xlsx-to-json-lc");


// var mongoose = require('mongoose');
db = db.connect('./db', [
  'pli',
  'audit',
  'actual',
  'finance',
  'hr_admin',
  'approved',
  'icecream',
  'attrition',
  'marketing',
  'transfers',
  'supplychain',
  'dairyvacancy',
  'manningMaster',
  'attritionMaster',
]);


var app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var hr              = require('./routes/hr'),
    pli             = require('./routes/pli'),
    audit           = require('./routes/audit'),
    index           = require('./routes/index'),
    manning         = require('./routes/manning'),
    finance         = require('./routes/finance'),
    icecream        = require('./routes/icecream'),
    marketing       = require('./routes/marketing'),
    transfers       = require('./routes/transfers'),
    attrition       = require('./routes/attrition'),
    supplychain     = require('./routes/supplychain'),
    dairy_vacancy   = require('./routes/dairy_vacancy'),
    approved_actual = require('./routes/approved_actual');

app.use('/', index);
app.use('/pli', pli);
app.use('/audit', audit);
app.use('/hr_admin', hr);
app.use('/manning', manning);
app.use('/finance', finance);
app.use('/icecream', icecream);
app.use('/attrition', attrition);
app.use('/marketing', marketing);
app.use('/transfers', transfers);
app.use('/dairyvac', dairy_vacancy);
app.use('/supplychain', supplychain);
app.use('/approved_actual', approved_actual);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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
