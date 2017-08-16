(function() {

    'use strict';
    var express = require('express');
    var bodyParser = require('body-parser');
    var attritionRouter = express.Router();
    var db = require('diskdb');
    var moment = require('moment');
    var multer = require('multer');
    var xlstojson = require("xls-to-json-lc");
    var xlsxtojson = require("xlsx-to-json-lc");
    let prettyDate = require('pretty-easy-dates');

    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function(req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function(req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
        }
    });
    var upload = multer({ //multer settings
        storage: storage,
        fileFilter: function(req, file, callback) { //file filter
            if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
                return callback(new Error('Wrong extension type'));
            }
            callback(null, true);
        }
    }).single('file');



    db = db.connect('db', ['attrition']);
    db = db.connect('db', ['attritionMaster']);
    db = db.connect('db', ['manningMaster']);

    var DV = require('../models/attrition');
    var DV1 = require('../models/attritionMaster');
    var DV2 = require('../models/manningMaster');



    attritionRouter.get('/upload', function(req, res, next) {
        res.render('pages/attrition/upload');
    });


    attritionRouter.get('/uploadm', function(req, res, next) {
        res.render('pages/attrition/uploadm');
    });


    attritionRouter.get('/index', function(req, res, next) {
        var object = db.attritionMaster.find({});
        res.render('pages/attrition/index', { attritionMaster: object });
    });


    attritionRouter.get('/indexMaster', function(req, res, next) {
        var object = db.attritionMaster.find({});
        res.render('pages/attrition/indexMaster', { attritionMaster: object });
    });

    attritionRouter.get('/manningMaster', function(req, res, next) {

        var object = db.manningMaster.find({});
        res.render('pages/attrition/manningMaster', { manningMaster: object });
    });

    //Graphs & stats
    attritionRouter.get('/stats/companies_leftto', function(req, res, next){
       var Companies=db.attritionMaster.find({});
       res.render('pages/attrition/stats/companies_leftto', {Companies : Companies});
   });
    attritionRouter.get('/stats/reasons_toleave', function(req, res, next){
        var Reasons=db.attritionMaster.find({});

        res.render('pages/attrition/stats/reasons_toleave', { Reasons : Reasons });
    });

    attritionRouter.get('/stats/age_attrition', function(req, res, next){
 
        var manning  = db.manningMaster.find({});
        var age_20to35=0,age_35above=0,count=0;
        manning.forEach(function(obj){
            var birthday = obj.BirthDate;
            var formattedbd= moment(birthday, 'DD.MM.YYYY');
            var now = moment();
            var formattednow = moment(now, 'DD.MM.YYYY');
            var duration = moment.duration(formattednow.diff(formattedbd));
            var age = duration.asYears();
            console.log(age);

          if(age >=20 && age < 35){
            age_20to35++;   
          }
          else if(age >= 35){
            age_35above++;
          }
          count++;
        });
        
        age_35above= age_35above*100/count;
        age_20to35 = age_20to35*100/count;
        console.log(age_20to35);
        console.log(age_35above);  
        console.log(count);

       res.render('pages/attrition/stats/age_attrition', { age_20to35 :age_20to35 , age_35above: age_35above });
   });
    attritionRouter.get('/stats/gender_attrition', function(req, res, next){
        var object = db.attritionMaster.find({});

       res.render('pages/attrition/stats/gender_attrition', {attritionMaster : object });
   });
    // EDITED

    attritionRouter.route('/upload')
    .post(function(req, res, next) {
        var exceltojson;
        upload(req, res, function(err) {
            if (err) {
                res.json({ error_code: 1, err_desc: err });
                return;
            }

            if (!req.file) {
                res.json({ error_code: 1, err_desc: "No file passed" });
                return;
            }

            /*Check the extension of the incoming file and */
            if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
                exceltojson = xlsxtojson;
            } else {
                exceltojson = xlstojson;
            }
            try {
                exceltojson({
                    input: req.file.path,
                    output: "db/attritionMaster.json",
                        //lowerCaseHeaders:true
                    }, function(err, result) {
                        if (err) {
                            return res.json({ error_code: 1, err_desc: err, data: null });
                        }
                        res.json({ error_code: 0, err_desc: null, data: result });
                    });
            } catch (e) {
                res.json({ error_code: 1, err_desc: "Corupted excel file" });
            }
        });

    });



        // Manning

        attritionRouter.route('/uploadm')
        .post(function(req, res, next) {
            var exceltojson;
            upload(req, res, function(err) {
                if (err) {
                    res.json({ error_code: 1, err_desc: err });
                    return;
                }

                if (!req.file) {
                    res.json({ error_code: 1, err_desc: "No file passed" });
                    return;
                }

                /*Check the extension of the incoming file and */
                if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
                    exceltojson = xlsxtojson;
                } else {
                    exceltojson = xlstojson;
                }
                try {
                    exceltojson({
                        input: req.file.path,
                        output: "db/manningMaster.json",
                        //lowerCaseHeaders:true
                    }, function(err, result) {
                        if (err) {
                            return res.json({ error_code: 1, err_desc: err, data: null });
                        }
                        res.json({ error_code: 0, err_desc: null, data: result });
                    });
                } catch (e) {
                    res.json({ error_code: 1, err_desc: "Corupted excel file" });
                }
            });

        });




        attritionRouter.route('/indexMaster')
        .post(function(req, res, next) {
            //var single =db.attrition.save(req.body);
            res.redirect('/attrition');
        });


        attritionRouter.route('/manningMaster')
        .post(function(req, res, next) {
            //var single =db.attrition.save(req.body);
            res.redirect('/attrition');
        });


    //EDITED


    attritionRouter.get('/', function(req, res) {
        var object = db.attritionMaster.find({});
        res.render('pages/attrition/index', { attritionMaster: object });
    });


    var options = {
        multi: false,
        upsert: false
    };

    attritionRouter.get('/:id', function(req, res, next) {
        var found = db.attrition.findOne({ _id: req.params.id });
        res.render("pages/attrition/update", { object: found });
    });

    attritionRouter.post('/:id', function(req, res, next) {
        if (req.body._method == "patch") {
            console.log(req.body);
            var object = db.attrition.update({
                _id: req.body._id
            }, {
                ecategories: req.body.ecategories,
                month: req.body.month,
                average: req.body.average,
                left: req.body.left,
                percentage: req.body.percentage,
            }, { options });
        }
        res.redirect('/attrition');
    });

    attritionRouter.get('/delete/:id', function(req, res, next) {
        res.json(db.attrition.remove({ _id: req.params.id }), res.redirect('/attrition'));
    });
    module.exports = attritionRouter;
}());