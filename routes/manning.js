var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var db = require('diskdb');
var moment = require('moment');
var multer = require('multer');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var utils = require("../utils.js");

router.get('/upload', function (req, res, next) {
  res.render('pages/manning/upload');
});

router.get('/', function(req, res, next) {
  var object = db.manningMaster.find({});
  res.render('pages/manning/index', { manningMaster: object });
});

router.post('/upload', function(req, res, next) {
  utils.upload(req, res, function(err) {
    if (err) {
      res.json({error_code: 1, err_desc: err});
    }

    if (!req.file) {
      res.json({ error_code: 1, err_desc: "No file passed" });
    }

    /** Check the extension of the incoming file and */
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
      res.json({ error_code: 1, err_desc: "Corrupted excel file" });
    }

  })
})

module.exports = router;
