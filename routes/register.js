const express = require('express');
const router = express.Router();
const fs = require('fs');
const bcrypt = require('bcrypt'),
    path = require('path');
const imagemagick = require('imagemagick');

const mysql =  require('mysql2');
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "node_db",
    password: ""
});

const app = require('../app');

function loadImage(image, avatarId){
    if (image === null) {
        return;
    }
    image.mv(path.resolve('public/img', '' + avatarId + '_avatar.jpg'));
    /*.then(function(){
        imagemagick.resize({
            srcData: fs.readFileSync('public/img/' + avatarId + '_avatar.jpg', 'binary'),
            width: 150,
            height: 150
        }, function (err, stdout, stderr) {
            fs.writeFileSync('public/img/' + avatarId + '_avatar.jpg', stdout, 'binary');
        })
    }).catch(function (err){
        console.log(err);
    })*/
    // i can't solve this problem. even github pros still doesn't know what 2 do
}

/* GET reg page. */
router.get('/', function(req, res, next) {
    res.render('register.pug', { title:'main' });
});

/* GET _POST data from user. */
router.post('/', function (req, res, next){

    let avatarId = null;
    let tagExist;
    let now = new Date;
    let sqlQuery = "INSERT INTO users(login, password, firstName, lastName, tag, birthDate, sex, createdAt, avatarId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    let sqlIsRegistered = "SELECT COUNT(*) FROM users WHERE login = ?";
    let salt = bcrypt.genSaltSync(10);
    let hashedPassword = bcrypt.hashSync(req.body.password, salt);
    let sexBool = 0;
    if(req.body.sex === 'Male'){
        sexBool = 1;
    }
    let user = [];

    connection.connect(function(err){
        if (err) {
            return console.error("Ошибка: " + err.message);
        }
        else{
            console.log("Подключение к серверу MySQL успешно установлено");
        }
    });

    let image;

    connection.query(sqlIsRegistered, req.body.login,
        function (err, results) {
        console.log(results);
            if (results[0]['COUNT(*)'] !== 0) {
                res.render('register.pug', {title: 'main', registered: 2});
            }
            else {
                res.render('register.pug', {title: 'main', registered: 1});

                if (req.files === null) {
                    image = null;
                    avatarId = 0;

                    user = [req.body.login, hashedPassword, req.body.firstName, req.body.lastName,
                        tagExist, req.body.birthDate, sexBool, now, avatarId];

                    connection.query(sqlQuery, user,
                        function (err, results) {
                            if (err) console.log(err);
                            else console.log("Данные добавлены");
                        });

                } else {
                    image = req.files.image;
                    connection.query("SELECT MAX(id) FROM users",
                        function (error, result, fields) {
                            avatarId = result[0]['MAX(id)'] + 1;

                            tagExist = req.body.tag;
                            if (tagExist === '') {
                                tagExist = '' + avatarId;
                                tagExist = tagExist.padStart(4, '0');
                            }

                            user = [req.body.login, hashedPassword, req.body.firstName, req.body.lastName,
                                tagExist, req.body.birthDate, sexBool, now, avatarId];

                            console.log('ITS MY DEBUG');

                            connection.query(sqlQuery, user,
                                function (err, results) {
                                    if (err) console.log(err);
                                    else console.log("Данные добавлены");
                                });


                            loadImage(image, avatarId);

                        });

                }
            }
        });
    //let date = '' + now.getDate();
    //let month = '' + now.getMonth();
    //let datetime = '' + date.padStart(2,'0') + '-' + month.padStart(2, '0') + '-' + now.getFullYear() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();


});

module.exports = router;
