var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
  console.log(req.socket.remoteAddress);
  if (req.socket.remoteAddress === '111.34.55.211') {
    const err = new Error('Forbidden');
    err.status = 403;
    next(err);
    return;
  }
  next();
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
