var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var db = require('diskdb');
var moment = require('moment');
var utils = require('../utils');

var options = utils.options;

router.get('/new', function (req, res, next) {
  res.render('pages/pli/new');
});

router.route('/new')
  .post(function (req, res, next) {
    var count = db.pli.count();
    req.body.s_no = count + 1;
    var single = db.pli.save(req.body);
    res.redirect('/pli');
  });

router.get('/', function (req, res) {
  //res.json(db.dairyvacancy.find({}));
  var object = db.pli.find({});
  res.render('pages/pli/index', { pli: object });
});

router.get('/stats', function (req, res) {
  var pli = db.pli.find({});
  res.render('pages/pli/stats', { pli_all: pli });
});

router.get('/:id', function (req, res, next) {
  var found = db.pli.findOne({ _id: req.params.id });
  res.render("pages/pli/edit", { object: found });
});

router.post('/:id', function (req, res, next) {
  if (req.body._method == "patch") {
    console.log(req.body);
    var object = db.pli.update({
      _id: req.body._id
    }, {
        name: req.body.name,
        cnic: req.body.cnic,
        date: req.body.date,
        position: req.body.position,
        status: req.body.status
      }, { options }
    );
  }

  res.redirect('/pli');
});

router.get('/delete/:id', function (req, res, next) {
  res.json(db.pli.remove({ _id: req.params.id }), res.redirect('/pli'));
});


module.exports = router;
