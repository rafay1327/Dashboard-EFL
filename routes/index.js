var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('starter', { title: 'TA Dashboard' });
});

router.get('/pli_conducted', function(req, res, next) {
  //res.render('dairyvac', { title: 'TA Dashboard' });
	res.send('respond with pli conducted');
});
   

router.get('/approved_actual', function(req, res, next) {
  //res.render('dairyvac', { title: 'TA Dashboard' });
	res.send('respond with approved vs approved_actual');
});

module.exports = router;
