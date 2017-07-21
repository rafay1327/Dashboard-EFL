(function() {

  'use strict';
  var express = require('express');
  var bodyParser = require('body-parser');
  var attritionRouter = express.Router();
  var db = require('diskdb');
  var moment = require('moment');

  db = db.connect('db', ['attrition']);
  var DV = require('../models/attrition');
  attritionRouter.get('/new', function(req, res, next) {
    res.render('pages/attrition/new');
      
    });
  
  attritionRouter.route('/new')
  .post(function(req, res, next) {
   
var single =db.attrition.save(req.body);
   res.redirect('/attrition');
 });

  attritionRouter.get( '/', function(req, res) {
    
    var object = db.attrition.find({});
    res.render('pages/attrition/index', { attrition: object });

  });





var options = {
  multi :false,
  upsert : false
};

attritionRouter.get('/:id', function(req, res, next) {

  var found = db.attrition.findOne({ _id : req.params.id});

  res.render("pages/attrition/update",{object:found}); 

});

attritionRouter.post('/:id',function(req, res, next) {


  if (req.body._method == "patch") {
    console.log(req.body);
    var object = db.attrition.update({
      _id: req.body._id
    }, {
      
      ecategories :req.body.ecategories,
      month :req.body.month,
      average :req.body.average,
      left :req.body.left,
      percentage :req.body.percentage,
      
      

    }, {options}
    );
  
  }
  
  res.redirect('/attrition');
});

attritionRouter.get('/delete/:id',  function(req, res, next) {

 res.json(db.attrition.remove({ _id: req.params.id }), res.redirect('/attrition'));

});

module.exports = attritionRouter;

}());
