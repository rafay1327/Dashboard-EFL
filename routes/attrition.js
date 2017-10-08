var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var db = require('diskdb');
var moment = require('moment');
var multer = require('multer');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var utils = require("../utils.js");

var options = utils.options;

router.get('/upload', function (req, res, next) {
  res.render('pages/attrition/upload');
});

router.get('/index', function (req, res, next) {
  var object = db.attritionMaster.find({});
  res.render('pages/attrition/index', { attritionMaster: object });
});

router.get('/master', function (req, res, next) {
  var object = db.attritionMaster.find({});
  res.render('pages/attrition/master', { attritionMaster: object });
});


//Graphs & stats
router.get('/stats/companies_leftto', function (req, res, next) {
  var Companies = db.attritionMaster.find({});
  res.render('pages/attrition/stats/companies_leftto', { Companies: Companies });
});

router.get('/stats/reasons_toleave', function (req, res, next) {
  var Reasons = db.attritionMaster.find({});

  res.render('pages/attrition/stats/reasons_toleave', { Reasons: Reasons });
});

router.get('/stats/age_attrition', function (req, res, next) {

  var manning = db.manningMaster.find({});
  var age_20to35 = 0,
    age_35above = 0,
    count = 0;
  manning.forEach(function (obj) {
    var birthday = obj.BirthDate;
    var formattedbd = moment(birthday, 'DD.MM.YYYY');
    var now = moment();
    var formattednow = moment(now, 'DD.MM.YYYY');
    var duration = moment.duration(formattednow.diff(formattedbd));
    var age = duration.asYears();
    console.log(age);

    if (age >= 20 && age < 35) {
      age_20to35++;
    } else if (age >= 35) {
      age_35above++;
    }
    count++;
  });

  age_35above = age_35above * 100 / count;
  age_20to35 = age_20to35 * 100 / count;
  console.log(age_20to35);
  console.log(age_35above);
  console.log(count);

  res.render('pages/attrition/stats/age_attrition', { age_20to35: age_20to35, age_35above: age_35above });
});

//division wise attrition
router.get('/stats/division_attrition', function (req, res, next) {

  var result = db.attritionMaster.find({});
  var dairy=0,tech=0,fin=0,mkt=0,icecream=0,iaudit=0,agri=0,other=0;
  var division=null;
   result.forEach(function (obj) {
    switch (obj.Division) {
    case  'Dairy Sales':
    dairy++;
    break;
    case 'Agri Business':
    agri++;
    break;
    case 'Ice Cream':
    icecream++;
    break;
    case 'Finance & Strategic Business':
    fin++;
    break;
    case 'Internal Audit':
    iaudit++;
    break;
    case 'Marketing Dairy & Beverages':
    mkt++;
    break;
    case 'Technical Operations':
    tech++;
    break;
    default:
    other++;
    }
    
    
    });
    console.log(agri);
    console.log(dairy);
    console.log(other);

 
  res.render('pages/attrition/stats/division_attrition', { dairy:dairy, tech:tech, fin:fin, mkt:mkt, icecream:icecream, iaudit:iaudit,
  agri:agri, other:other });
});


router.get('/stats/gender_attrition', function (req, res, next) {
  var object = db.attritionMaster.find({});

  res.render('pages/attrition/stats/gender_attrition', { attritionMaster: object });
});
// EDITED

router.route('/upload')
  .post(function (req, res, next) {
    var exceltojson;
    utils.upload(req, res, function (err) {
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
          output: null
          // output: "db/attritionMaster.json",
          //lowerCaseHeaders:true
        }, function (err, result) {
          if (err) {
            return res.json({ error_code: 1, err_desc: err, data: null });
          }

          db.attritionMaster.save(result);

          var object = db.attritionMaster.find({});
          res.render('pages/attrition/indexMaster', { attritionMaster: object });
          // res.json({ error_code: 0, err_desc: null, data: result });
        });
      } catch (e) {
        res.json({ error_code: 1, err_desc: "Corrupted excel file" });
      }
    });

  });


router.route('/indexMaster')
  .post(function (req, res, next) {
    //var single =db.attrition.save(req.body);
    res.redirect('/attrition');
  });

router.route('/manningMaster')
  .post(function (req, res, next) {
    //var single =db.attrition.save(req.body);
    res.redirect('/attrition');
  });


//EDITED


router.get('/', function (req, res) {
  var object = db.attritionMaster.find({});
  res.render('pages/attrition/index', { attritionMaster: object });
});

router.get('/:id', function (req, res, next) {
  var obj = db.attrition.findOne({ _id: req.params.id });
  res.render("pages/attrition/update", { object: obj });
});



router.post('/:id', function (req, res, next) {
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

router.get('/delete/:id', function (req, res, next) {
  res.json(db.attrition.remove({ _id: req.params.id }), res.redirect('/attrition'));
});


module.exports = router;
