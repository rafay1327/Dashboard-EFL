(function() {

  'use strict';
  var express = require('express');
  var bodyParser = require('body-parser');
  var dvRouter = express.Router();
  var db = require('diskdb');
  db = db.connect('db', ['dairyvacancy']);


  dvRouter.get('/', function(req, res, next) {
  res.render('pages/dairyvac');
      //  res.send('respond with dairy vacancies');
  });


 dvRouter.get('/new',function(req, res,next ) {
        res.render('pages/dairyvac/new');
    
  });
  dvRouter.post('/new',function(req, res, next) {


       res.json(db.dairyvacancy.save(req.body) ,  res.render('./single' , console.log('WOW')) );

  });

   dvRouter.get('/single', function(req, res, next) {
  res.render('pages/dairyvac/single', { title: 'Dairy Vacancy Single' });
      //  res.send('respond with dairy vacancies');
  });
  

 dvRouter.get( '/show', function(req, res) {
    res.json(db.dairyvacancy.find({}));

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

  dvRouter.get('/update/:id',function(req, res, next) {
    
   db.dairyvacancy.update({
      _id: req.body._id
    }, {
        s_no : req.body.s_no,
        position :req.body.position
        }, {options}
        );
  });
 
  //dvRouter.route('delete/:id')
  dvRouter.get('/delete/:id',  function(req, res, next) {
    
   res.json(db.dairyvacancy.remove({ _id: req.params.id }));
  
  });




  module.exports = dvRouter;

}());
