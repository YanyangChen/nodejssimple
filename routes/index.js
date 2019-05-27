var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/pmp', function(req, res, next) {
    res.render('pmp', { title: 'PMP resources' });
});

router.get('/pmp0', function(req, res, next) {
    res.render('pmp0', { title: 'PMP resources' });
});

router.get('/tryvue', function (req, res) {
    res.sendfile(__dirname + '/tryvue.html');
});

router.get('/vuepages', function (req, res) {
    res.sendfile(__dirname + '/vuepages.html');
});

// router.get('/tryvue', function(req, res, next) {
//     res.render('tryvue', { title: 'PMP resources' });
// });


module.exports = router;
