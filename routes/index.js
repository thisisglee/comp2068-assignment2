var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/tournament', function(req, res, next) {
  res.render('./Tournament/tournament', { title: 'Express' });
});
router.get('/player', function(req, res, next) {
  res.render('./Tournament/player', { title: 'Express' });
});
router.get('/round1', function(req, res, next) {
  res.render('./Round/round1', { title: 'Express' });
});
router.get('/round2', function(req, res, next) {
  res.render('./Round/round2', { title: 'Express' });
});
router.get('/round3', function(req, res, next) {
  res.render('./Round/round3', { title: 'Express' });
});
module.exports = router;
