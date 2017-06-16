var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('starter', { title: 'TA Dashboard' });
});


router.get('/dairyvac', function(req, res, next) {
  res.render('pages/dairyvac/index', { title: 'Dairy Vacancy' });

});
router.get('/pli_conducted', function(req, res, next) {
  //res.render('dairyvac', { title: 'TA Dashboard' });
	res.send('respond with pli conducted');
});
router.get('/transfers', function(req, res, next) {
  //res.render('dairyvac', { title: 'TA Dashboard' });
	res.send('respond with transfers');
});
router.get('/attrition', function(req, res, next) {
  //res.render('dairyvac', { title: 'TA Dashboard' });
	res.send('respond with attrition');
});
router.get('/approved_actual', function(req, res, next) {
  //res.render('dairyvac', { title: 'TA Dashboard' });
	res.send('respond with approved vs approved_actual');
});

module.exports = router;
