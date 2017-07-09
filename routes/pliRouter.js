(function() {

  'use strict';
  var express = require('express');
  var bodyParser = require('body-parser');
  var pliRouter = express.Router();
  var db = require('diskdb');
  var moment = require('moment');

  db = db.connect('db', ['pli']);
  var PLI = require('../models/pli');

  pliRouter.get('/new', function(req, res, next) {

    res.render('pages/pli/new');

    });
  
  pliRouter.route('/new')
  .post(function(req, res, next) {

   var count = db.pli.count();
   req.body.s_no= count+1;
   var single =db.pli.save(req.body); 

   res.redirect('/pli');
    
   });

  pliRouter.get( '/', function(req, res) {
    //res.json(db.dairyvacancy.find({}));
    var object = db.pli.find({});
    res.render('pages/pli/index', { pli: object });

  });

 pliRouter.get( '/stats', function(req, res) {
  var pli = db.pli.find({});
    res.render('pages/pli/stats', {pli_all : pli });

  });


//============================================================================================//

var options = {
  multi :false,
  upsert : false
};

pliRouter.get('/:id', function(req, res, next) {

  var found = db.pli.findOne({ _id : req.params.id});

  res.render("pages/pli/edit",{object:found}); 

});

pliRouter.post('/:id',function(req, res, next) {

  if (req.body._method == "patch") {
    console.log(req.body);
    var object =db.pli.update({
      _id: req.body._id
    }, {
      
      name :req.body.name,
      cnic  : req.body.cnic,
      date : req.body.date,
      position: req.body.position,
      status : req.body.status
     

    }, {options}
    );
  
  }
  
  res.redirect('/pli');
});

pliRouter.get('/delete/:id',  function(req, res, next) {

 res.json(db.pli.remove({ _id: req.params.id }), res.redirect('/pli'));

});



module.exports = pliRouter;

}());
