var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require("passport");
var db = require('diskdb');
db = db.connect('db', ['users']);
var User = require('../models/user');



//Register

router.get('/register', function(req, res){
	res.render('pages/auth/register');
});
router.post('/register', function(req, res){

	 var newuser = new User({username:req.body.username});
     User.register(newuser,req.body.password,function(error, user){
         if(error){
              req.flash("error", error.message);
             return res.render("pages/auth/register");
         }else
             passport.authenticate("local")(req,res,function(){
               req.flash("success","welcome !" + user.username);
                 res.redirect("/");
             });
         
     });


});


//login
router.get('/login', function(req, res){
	res.render('pages/auth/login');
});


module.exports =  router;