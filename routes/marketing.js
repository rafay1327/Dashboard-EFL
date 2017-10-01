(function() {

  'use strict';
  var express = require('express');
  var bodyParser = require('body-parser');
  var mktRouter = express.Router();
  var db = require('diskdb');
  var moment = require('moment');

  // db = db.connect('db', ['marketing']);

  mktRouter.get('/new', function(req, res, next) {
    res.render('pages/marketing/new');
      //  res.send('respond with dairy vacancies');
    });
  
  mktRouter.route('/new')
  .post(function(req, res, next) {
   
   var count = db.marketing.count();
   req.body.s_no= count +1 ;

   var ceo_date = moment(req.body.ceo_approval_date, 'YYYY-MM-DD');
   var doj_date = moment(req.body.doj , 'YYYY-MM-DD');
   var duration = moment.duration(doj_date.diff(ceo_date));
   var days_hire = duration.asDays();
   req.body.days_to_hire = days_hire;
   var single =db.marketing.save(req.body); 

   res.redirect('/marketing');
 });

  mktRouter.get( '/', function(req, res) {
    //res.json(db.dairyvacancy.find({}));
    var object = db.marketing.find({});
    res.render('pages/marketing/index', { marketing: object });

  });



//============================================================================================//

var options = {
  multi :false,
  upsert : false
};

mktRouter.get('/:id', function(req, res, next) {

  var found = db.marketing.findOne({ _id : req.params.id});

  res.render("pages/marketing/update",{object:found}); 

});

mktRouter.post('/:id',function(req, res, next) {

   var ceo_date = moment(req.body.ceo_approval_date, 'YYYY-MM-DD');
   var doj_date = moment(req.body.doj , 'YYYY-MM-DD');
   var duration = moment.duration(doj_date.diff(ceo_date));
   var days_hire = duration.asDays();
   req.body.days_to_hire = days_hire;

  if (req.body._method == "patch") {
    console.log(req.body);
    var object =db.marketing.update({
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
  
  res.redirect('/dairyvac');
});

mktRouter.get('/delete/:id',  function(req, res, next) {

 res.json(db.marketing.remove({ _id: req.params.id }), res.redirect('/dairyvac'));

});

module.exports = mktRouter;

}());
