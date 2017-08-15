(function() {

  'use strict';
  var express = require('express');
  var bodyParser = require('body-parser');
  var auditRouter = express.Router();
  var db = require('diskdb');
  var moment = require('moment');

  db = db.connect('db', ['audit']);

  auditRouter.get('/new', function(req, res, next) {
    res.render('pages/audit/new');
      //  res.send('respond with dairy vacancies');
    });
  
  auditRouter.route('/new')
  .post(function(req, res, next) {
   
   var count = db.audit.count();
   req.body.s_no= count +1 ;

   var ceo_date = moment(req.body.ceo_approval_date, 'YYYY-MM-DD');
   var doj_date = moment(req.body.doj , 'YYYY-MM-DD');
   var duration = moment.duration(doj_date.diff(ceo_date));
   var days_hire = duration.asDays();
   req.body.days_to_hire = days_hire;
   var single =db.audit.save(req.body); 

   res.redirect('/audit');
 });

  auditRouter.get( '/', function(req, res) {
    //res.json(db.dairyvacancy.find({}));
    var object = db.audit.find({});
    res.render('pages/audit/index', { audit: object });

  });



//============================================================================================//

var options = {
  multi :false,
  upsert : false
};

auditRouter.get('/:id', function(req, res, next) {

  var found = db.audit.findOne({ _id : req.params.id});

  res.render("pages/audit/update",{object:found}); 

});

auditRouter.post('/:id',function(req, res, next) {

   var ceo_date = moment(req.body.ceo_approval_date, 'YYYY-MM-DD');
   var doj_date = moment(req.body.doj , 'YYYY-MM-DD');
   var duration = moment.duration(doj_date.diff(ceo_date));
   var days_hire = duration.asDays();
   req.body.days_to_hire = days_hire;

  if (req.body._method == "patch") {
    console.log(req.body);
    var object =db.audit.update({
      _id: req.body._id
    }, {
      
      position :req.body.position,
      region : req.body.region,
      division: req.body.division,
      ta_fp: req.body.ta_fp,
      tier: req.body.tier,
      last_incumbent: req.body.last_incumbent,
      vacant_since: req.body.vacant_since,
      ceo_approval_date: req.body.ceo_approval_date,
      n_candidates_sourced: req.body.n_candidates_sourced,
      n_candidates_tested: req.body.n_candidates_tested,
      interviews: req.body.interviews,
      shortlisted : req.body.shortlisted,
      offer_date: req.body.offer_date,
      acceptance_date: req.body.acceptance_date,
      doj: req.body.doj,
      status: req.body.status,
      days_to_hire : req.body.days_to_hire

    }, {options}
    );
  
  }
  
  res.redirect('/audit');
});

auditRouter.get('/delete/:id',  function(req, res, next) {

 res.json(db.audit.remove({ _id: req.params.id }), res.redirect('/audit'));

});

module.exports = auditRouter;

}());
