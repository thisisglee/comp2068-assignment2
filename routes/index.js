var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/yardsale', function(req, res, next) {
  res.render('./Yardsale/yardsale', { title: 'Express' });
});
router.get('/user', function(req, res, next) {
  res.render('./Yardsale/user', { title: 'Express' });
});
module.exports = router;
