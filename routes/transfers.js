var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var db = require('diskdb');
var moment = require('moment');
var options = require('../utils').options;

router.get('/new', function (req, res, next) {
  res.render('pages/transfers/new');
});

router.route('/new')
  .post(function (req, res, next) {
    var effectivedate = moment(req.body.edate, 'YYYY-MM-DD');
    var single = db.transfers.save(req.body);
    res.redirect('/transfers');
  });

router.get('/', function (req, res) {
  var object = db.transfers.find({});
  res.render('pages/transfers/index', { transfers: object });
});

router.get('/stats', function (req, res) {
  var transfers     = db.transfers.find({});

  var o_agri        = db.transfers.find({ odivision: "Agri Business" }).length;
  var o_dairy       = db.transfers.find({ odivision: "Dairy Sales" }).length;
  var o_finance     = db.transfers.find({ odivision: "Finance and Strategic Business" }).length;
  var o_generalmgmt = db.transfers.find({ odivision: "General Management" }).length;
  var o_hr_admin    = db.transfers.find({ odivision: "Human Resources and Admin" }).length;
  var o_icecream    = db.transfers.find({ odivision: "Ice Cream" }).length;
  var o_audit       = db.transfers.find({ odivision: "Internal Audit" }).length;
  var o_tech_op     = db.transfers.find({ odivision: "Technical Operations" }).length;
  var o_marketing   = db.transfers.find({ odivision: "Marketing Dairy & Beverages" }).length;

  var n_agri        = db.transfers.find({ ndivision: "Agri Business" }).length;
  var n_dairy       = db.transfers.find({ ndivision: "Dairy Sales" }).length;
  var n_finance     = db.transfers.find({ ndivision: "Finance and Strategic Business" }).length;
  var n_generalmgmt = db.transfers.find({ ndivision: "General Management" }).length;
  var n_hr_admin    = db.transfers.find({ ndivision: "Human Resources and Admin" }).length;
  var n_icecream    = db.transfers.find({ ndivision: "Ice Cream" }).length;
  var n_audit       = db.transfers.find({ ndivision: "Internal Audit" }).length;
  var n_tech_op     = db.transfers.find({ ndivision: "Technical Operations" }).length;
  var n_marketing   = db.transfers.find({ ndivision: "Marketing Dairy & Beverages" }).length;

  res.render('pages/transfers/stats', {
    transfers_all: transfers,
    
    o_agri       : o_agri,
    o_dairy      : o_dairy,
    o_finance    : o_finance,
    o_generalmgmt: o_generalmgmt,
    o_hr_admin   : o_hr_admin,
    o_icecream   : o_icecream,
    o_audit      : o_audit,
    o_tech_op    : o_tech_op,
    o_marketing  : o_marketing,

    n_dairy      : n_dairy,
    n_agri       : n_agri,
    n_finance    : n_finance,
    n_generalmgmt: n_generalmgmt,
    n_hr_admin   : n_hr_admin,
    n_icecream   : n_icecream,
    n_audit      : n_audit,
    n_tech_op    : n_tech_op,
    n_marketing  : n_marketing,
  });

});

router.get('/:id', function (req, res, next) {
  var found = db.transfers.findOne({ _id: req.params.id });
  res.render("pages/transfers/update", { object: found });
});

router.post('/:id', function (req, res, next) {
  if (req.body._method == "patch") {
    console.log(req.body);
    var object = db.transfers.update({
      _id: req.body._id
    }, {
        pno      : req.body.pno,
        ename    : req.body.ename,
        odivision: req.body.odivision,
        oposition: req.body.oposition,
        ndivision: req.body.ndivision,
        nposition: req.body.nposition,
        edate    : req.body.edate,
        status   : req.body.status
      }, { options }
    );
  }
  res.redirect('/transfers');
});

router.get('/delete/:id', function (req, res, next) {
  res.json(db.transfers.remove({ _id: req.params.id }), res.redirect('/transfers'));
});

module.exports = router;
