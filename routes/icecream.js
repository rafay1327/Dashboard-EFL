var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var db = require('diskdb');
var moment = require('moment');
var utils = require('../utils');

var options = utils.options;

router.get('/new', function (req, res, next) {
  //  res.send('respond with dairy vacancies');
  res.render('pages/icecream/new');
});

router.route('/new')
  .post(function (req, res, next) {

    var count = db.icecream.count();
    req.body.s_no = count + 1;

    var ceo_date = moment(req.body.ceo_approval_date, 'YYYY-MM-DD');
    var doj_date = moment(req.body.doj, 'YYYY-MM-DD');
    var duration = moment.duration(doj_date.diff(ceo_date));
    var days_hire = duration.asDays();
    req.body.days_to_hire = days_hire;
    var single = db.icecream.save(req.body);

    res.redirect('/icecream');
  });

router.get('/', function (req, res) {
  //res.json(db.dairyvacancy.find({}));
  var object = db.icecream.find({});
  res.render('pages/icecream/index', { icecream: object });
});


router.get('/:id', function (req, res, next) {
  var found = db.icecream.findOne({ _id: req.params.id });
  res.render("pages/icecream/update", { object: found });
});

router.post('/:id', function (req, res, next) {

  var ceo_date = moment(req.body.ceo_approval_date, 'YYYY-MM-DD');
  var doj_date = moment(req.body.doj, 'YYYY-MM-DD');
  var duration = moment.duration(doj_date.diff(ceo_date));
  var days_hire = duration.asDays();
  req.body.days_to_hire = days_hire;

  if (req.body._method == "patch") {
    console.log(req.body);
    var object = db.icecream.update({
      _id: req.body._id
    }, {
        position: req.body.position,
        region: req.body.region,
        division: req.body.division,
        ta_fp: req.body.ta_fp,
        tier: req.body.tier,
        last_incumbent: req.body.last_incumbent,
        vacant_since: req.body.vacant_since,
        ceo_approval_date: req.body.ceo_approval_date,
        n_candidates_sourced: req.body.n_candidates_sourced,
        n_candidates_tested: req.body.n_candidates_tested,
        interviews: req.body.interviews,
        shortlisted: req.body.shortlisted,
        offer_date: req.body.offer_date,
        acceptance_date: req.body.acceptance_date,
        doj: req.body.doj,
        status: req.body.status,
        days_to_hire: req.body.days_to_hire

      }, { options }
    );

  }

  res.redirect('/icecream');
});

router.get('/delete/:id', function (req, res, next) {
  if (db.icecream.remove({ _id: req.params.id })) {
    res.redirect('/icecream');    
  } else {
    res.json({error: "unable to delete"});
  }
  


});

module.exports = router;

// http://localhost:3000/icecream/delete/dcefaccade334c148d9fe10d213ef2eb

/* 
  [
      {
          "position": "",
          "region": "",
          "division": [
              "",
              ""
          ],
          "ta_fp": "",
          "tier": "Tier V",
          "last_incumbent": "",
          "vacant_since": "",
          "ceo_approval_date": "",
          "n_candidates_sourced": "",
          "n_candidates_tested": "",
          "Interviews": "",
          "shortlisted": "",
          "offer_date": "",
          "acceptance_date": "",
          "doj": "2017-07-15",
          "status": "",
          "s_no": 1,
          "days_to_hire": null,
          "_id": "dcefaccade334c148d9fe10d213ef2eb"
      }
  ]
  */