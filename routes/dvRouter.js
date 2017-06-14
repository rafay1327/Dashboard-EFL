(function() {

  'use strict';
  var express = require('express');
  var dvRouter = express.Router();
  var db = require('diskdb');
  db = db.connect('db', ['dairyvacancy']);

 dvRouter.route('/dvData')

 .get( function(req, res) {
    res.json(db.dairyvacancy.find());
  })

  .post(function(req, res) {
    res.json(db.dairyvacancy.save(req.body));
  })

 .put(function(req, res) {
    res.json(db.dairyvacancy.update({
      _id: req.body._id
    }));
  })
 
  .delete(function(req, res) {
    res.json(db.dairyvacancy.remove({
      _id: req.params._id
    }));
  });



  dvRouter.route('/dvData/:id')


  .get(function(req, res) {
    res.json(db.dairyvacancy.find());
  })
  .put(function(req, res) {
    res.json(db.dairyvacancy.update({
      _id: req.body._id
    }));
  })
  .delete(function(req, res) {
    res.json(db.dairyvacancy.remove({
      _id: req.params._id
    }));
  });




  module.exports = dvRouter;

}());
