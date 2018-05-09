var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/messages', function(req, res, next) {
  var data = req.data;

  res.render('messages_test', 
  // { user: 
  //   {username: 'User', roles: ['r1','r2','r3']} 
  // }
  data
);
});

module.exports = router;
