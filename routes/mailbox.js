var express = require('express');
var router = express.Router();

const mySqlGetUserPassword = "SELECT Password FROM messengerusers  WHERE Login = ?";

/* GET reg page. */
router.get('/', function(req, res, next) {

});

/* GET _POST data from user. */
router.post('/', function (req, res, next){

});

module.exports = router;
