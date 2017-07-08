(function() {

  'use strict';
  var express = require('express');
  var bodyParser = require('body-parser');
  var transfersRouter = express.Router();
  var db = require('diskdb');
  var moment = require('moment');

  db = db.connect('db', ['transfers']);
  var DV = require('../models/transfers');
  transfersRouter.get('/new', function(req, res, next) {
    res.render('pages/transfers/new');
      
    });
  
  transfersRouter.route('/new')
  .post(function(req, res, next) {


   var effectivedate = moment(req.body.edate, 'YYYY-MM-DD');
   var single =db.transfers.save(req.body);

   res.redirect('/transfers');
 });

  transfersRouter.get( '/', function(req, res) {
    
    var object = db.transfers.find({});
    res.render('pages/transfers/index', { transfers: object });

  });





var options = {
  multi :false,
  upsert : false
};

transfersRouter.get('/:id', function(req, res, next) {

  var found = db.transfers.findOne({ _id : req.params.id});

  res.render("pages/transfers/update",{object:found}); 

});

transfersRouter.post('/:id',function(req, res, next) {


  if (req.body._method == "patch") {
    console.log(req.body);
    var object = db.transfers.update({
      _id: req.body._id
    }, {
      
      pno :req.body.pno,
      ename :req.body.ename,
      odivision :req.body.odivision,
      oposition :req.body.oposition,
      ndivision :req.body.ndivision,
      nposition :req.body.nposition,
      edate :req.body.edate

    }, {options}
    );
  
  }
  
  res.redirect('/transfers');
});

transfersRouter.get('/delete/:id',  function(req, res, next) {

 res.json(db.transfers.remove({ _id: req.params.id }), res.redirect('/transfers'));

});

module.exports = transfersRouter;

}());
