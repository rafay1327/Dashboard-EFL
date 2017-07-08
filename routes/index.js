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

module.exports = router;
