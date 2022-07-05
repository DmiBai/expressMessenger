const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mysql =  require('mysql2');
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "node_db",
    password: ""
});
const mySqlGetUserPassword = "SELECT password FROM users WHERE login = ?";

/* GET reg page. */
router.get('/', function(req, res, next) {
    res.render('auth.pug', { title:'main' });
});

/* GET _POST data from user. */
router.post('/', function (req, res, next){
    let userLogin = [req.body.login];
    connection.query(mySqlGetUserPassword, userLogin,
        function (err, result){
        if(err) console.log(err);
        console.log(result);
        let dbPassword = result[0]['password'];
        bcrypt.compare(req.body.password, dbPassword,
            function (err, cmpRes){
            if(err) console.log(err);
            //compare result
            if(cmpRes){
                res.cookie('username', req.body.login);
                res.render('auth.pug', {
                    title:"auth",
                    authSuccess: 1,
                });
            } else {
                res.render('auth.pug', {
                    title:"auth",
                    authErr: 1,
                });
            }
        });
    });
});

module.exports = router;
