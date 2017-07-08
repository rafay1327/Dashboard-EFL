(function () {
  
  'use strict';

  var express = require('express');
  var body_parser = require('body-parser');
  var router = express.Router();
  var db = require('diskdb');
  var moment = require('moment');

  db.connect('db', ['approved', 'actual']);
  // var approved = require('../models/approved');

  router.get('/', function (req, res) {
    var objects = db.approved.find();
    res.render('pages/approved_actual/index', {approved: objects});
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

  module.exports = router;
}());