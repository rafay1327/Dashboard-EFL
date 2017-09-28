var path          = require('path');
var multer        = require('multer');
var logger        = require('morgan');
var express       = require('express');
var bodyParser    = require('body-parser');
var cookieParser  = require('cookie-parser');
var favicon       = require('serve-favicon');
var xlstojson     = require("xls-to-json-lc");
var xlsxtojson    = require("xlsx-to-json-lc");


// var mongoose = require('mongoose');

// routes
var index = require('./routes/index');
var dvRouter = require('./routes/dvRouter');
var transfersRouter= require('./routes/transfersRouter');
var attritionRouter= require('./routes/attritionRouter');
var aaRouter = require('./routes/aaRouter');
var pliRouter = require('./routes/pliRouter');
var mktRouter = require('./routes/mktRouter');
var scRouter = require('./routes/scRouter');
var finRouter = require('./routes/finRouter');
var hrRouter = require('./routes/hrRouter');
var auditRouter = require('./routes/auditRouter');
var icRouter =  require('./routes/icRouter');


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






 var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
    });
    var upload = multer({ //multer settings
                    storage: storage,
                    fileFilter : function(req, file, callback) { //file filter
                        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
                            return callback(new Error('Wrong extension type'));
                        }
                        callback(null, true);
                    }
                }).single('file');
/** API path that will upload the files */
    app.post('/upload', function(req, res) {
        var exceltojson;
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
            /** Multer gives us file info in req.file object */
            if(!req.file){
                res.json({error_code:1,err_desc:"No file passed"});
                return;
            }
            /** Check the extension of the incoming file and 
             *  use the appropriate module
             */
            if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
                exceltojson = xlsxtojson;
            } else {
                exceltojson = xlstojson;
            }
            try {
                exceltojson({
                    input: req.file.path,
                    output: null, //since we don't need output.json
                    lowerCaseHeaders:true
                }, function(err,result){
                    if(err) {
                        return res.json({error_code:1,err_desc:err, data: null});
                    } 
                    res.json({error_code:0,err_desc:null, data: result});
                });
            } catch (e){
                res.json({error_code:1,err_desc:"Corupted excel file"});
            }
        })
    }); 














app.use('/', index);
app.use('/pli', pliRouter);
app.use('/transfers', transfersRouter);
app.use('/dairyvac', dvRouter);
app.use('/attrition', attritionRouter);
app.use('/approved_actual', aaRouter);
app.use('/marketing', mktRouter);
app.use('/supplychain', scRouter);
app.use('/finance', finRouter);
app.use('/hr_admin', hrRouter);
app.use('/audit', auditRouter);
app.use('/icecream', icRouter);
//edited





//edited

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
