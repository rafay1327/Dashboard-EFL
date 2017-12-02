var express = require('express');
var body_parser = require('body-parser');
var router = express.Router();
var db = require('diskdb');
var moment = require('moment');

// db.connect('db', ['approved', 'actual']);
// var approved = require('../models/approved');

router.get('/', function (req, res) {
  var objects = db.approved.find();
  var at = db.attritionMaster.find({});
  res.render('pages/approved_actual/index', {approved: objects, attritionMaster: at});
});

//// api methods

router.get('/api/index/:year/:month', function (req, res) {
  // var year = req.params.year;
  // var month = req.params.month;

  if (req.params.month == 0) {
    var approved = db.approved.findOne({year: req.params.year});
    // var actual = db.actual.find({"year": 2015});
    // console.log(actual);
    
    // res.json({approved: approved, actual: actual});
    res.json(approved);
    // res.json({approved, actual});
  } else if (req.params.month != 0) {
    var actual = db.actual.findOne({year: req.params.year, month: req.params.month});
    res.json(actual);
  }
});

router.get('/create', function (req, res, next) {
  res.render('pages/approved_actual/create');
  // res.json({a: 'pages/approved_actual/create'});
})

router.post('/insert', function (req, res, next) {
  // console.log(req.body)
  var approved = {
    "year": req.body.year.trim(),
    "marketing": {
      "nmpts": req.body.nmpts[0].trim(),
      "tierv": req.body.tierv[0].trim(),
      "tieriv": req.body.tieriv[0].trim(),
      "tieriii": req.body.tieriii[0].trim(),
      "tierii": req.body.tierii[0].trim(),
      "tieri": req.body.tieri[0].trim()
    },
    "dairy_sales": {
      "nmpts": req.body.nmpts[1].trim(),
      "tierv": req.body.tierv[1].trim(),
      "tieriv": req.body.tieriv[1].trim(),
      "tieriii": req.body.tieriii[1].trim(),
      "tierii": req.body.tierii[1].trim(),
      "tieri": req.body.tieri[1].trim()
    },
    "technical_operation": {
      "nmpts": req.body.nmpts[2].trim(),
      "tierv": req.body.tierv[2].trim(),
      "tieriv": req.body.tieriv[2].trim(),
      "tieriii": req.body.tieriii[2].trim(),
      "tierii": req.body.tierii[2].trim(),
      "tieri": req.body.tieri[2].trim()
    },
    "hr_admin": {
      "nmpts": req.body.nmpts[3].trim(),
      "tierv": req.body.tierv[3].trim(),
      "tieriv": req.body.tieriv[3].trim(),
      "tieriii": req.body.tieriii[3].trim(),
      "tierii": req.body.tierii[3].trim(),
      "tieri": req.body.tieri[3].trim()
    },
    "finance_sbd": {
      "nmpts": req.body.nmpts[4].trim(),
      "tierv": req.body.tierv[4].trim(),
      "tieriv": req.body.tieriv[4].trim(),
      "tieriii": req.body.tieriii[4].trim(),
      "tierii": req.body.tierii[4].trim(),
      "tieri": req.body.tieri[4].trim()
    },
    "ice_cream": {
      "nmpts": req.body.nmpts[5].trim(),
      "tierv": req.body.tierv[5].trim(),
      "tieriv": req.body.tieriv[5].trim(),
      "tieriii": req.body.tieriii[5].trim(),
      "tierii": req.body.tierii[5].trim(),
      "tieri": req.body.tieri[5].trim()
    },
    "audit": {
      "nmpts": req.body.nmpts[6].trim(),
      "tierv": req.body.tierv[6].trim(),
      "tieriv": req.body.tieriv[6].trim(),
      "tieriii": req.body.tieriii[6].trim(),
      "tierii": req.body.tierii[6].trim(),
      "tieri": req.body.tieri[6].trim()
    },
    "general_management": {
      "nmpts": req.body.nmpts[7].trim(),
      "tierv": req.body.tierv[7].trim(),
      "tieriv": req.body.tieriv[7].trim(),
      "tieriii": req.body.tieriii[7].trim(),
      "tierii": req.body.tierii[7].trim(),
      "tieri": req.body.tieri[7].trim()
    },
    "legal": {
      "nmpts": req.body.nmpts[8].trim(),
      "tierv": req.body.tierv[8].trim(),
      "tieriv": req.body.tieriv[8].trim(),
      "tieriii": req.body.tieriii[8].trim(),
      "tierii": req.body.tierii[8].trim(),
      "tieri": req.body.tieri[8].trim()
    }
  }

  db.approved.save(approved)

  res.redirect("/approved_actual")
})

module.exports = router;