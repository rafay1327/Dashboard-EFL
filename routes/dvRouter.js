(function() {

  'use strict';
  var express = require('express');
  var bodyParser = require('body-parser');
  var dvRouter = express.Router();
  var db = require('diskdb');
  db = db.connect('db', ['dairyvacancy']);
  var DV = require('../models/dairyvac');
  dvRouter.get('/new', function(req, res, next) {
    res.render('pages/dairyvac/new');
      //  res.send('respond with dairy vacancies');
    });
  
  dvRouter.route('/new')
  .post(function(req, res, next) {

    var single =db.dairyvacancy.save(req.body); 
    res.redirect('/dairyvac');
  });

  dvRouter.get( '/', function(req, res) {
    //res.json(db.dairyvacancy.find({}));
    var object = db.dairyvacancy.find({});
    res.render('pages/dairyvac/index', { dairyvacancy: object });

  });

//============================================================================================//

var options = {
  multi :false,
  upsert : false
};


 // dvRouter.route('/show/:id')
 dvRouter.get('/show/:id', function(req, res, next) {
     //req.params.dishId holds the dish id

     res.json(db.dairyvacancy.find({
      _id : req.params.id
    }));

   });

 dvRouter.get('/update/:id', function(req, res, next) {

    var found = db.dairyvacancy.find({ _id : req.params.id});
        res.render("pages/dairyvac/update",{object:found}); 
        
    /*
    DV.findById(req.params.id,function(err,foundObj){
                     res.render("pages/dairyvac/update",{object:foundObj});    
                    });
*/
      //  res.send('respond with dairy vacancies');
    });

 dvRouter.put('/update/:id',function(req, res, next) {
var object =db.dairyvacancy.update({
    _id: req.body._id
  }, {
    // s_no : req.body.s_no,
    // position :req.body.position,
    // region : req.body.region,
    // division: req.body.division,
    // ta_fp: req.body.ta_fp,
    // tier: req.body.tier,
    // last_incumbent: req.body.last_incumbent,
    // vacant_since: req.body.vacant_since,
    // ceo_approval_date: req.body.ceo_approval_date,
    // n_candidates_sourced: req.body.n_candidates_sourced,
    // n_candidates_tested: req.body.n_candidates_tested,
    // interviews: req.body.interviews,
    // shortlisted : req.body.shortlisted,
    // offer_date: req.body.offer_date,
    // acceptance_date: req.body.acceptance_date,
    // doj: req.body.doj,
    // status: req.body.status,
    // days_to_hire : req.body.days_to_hire

  }, {options}
  );
  
    res.redirect('/dairyvac');

   
 });
 
  //dvRouter.route('delete/:id')
  dvRouter.get('/delete/:id',  function(req, res, next) {

   res.json(db.dairyvacancy.remove({ _id: req.params.id }), res.redirect('/dairyvac'));

 });

  module.exports = dvRouter;

}());
