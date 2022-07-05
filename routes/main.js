var express = require('express');
var router = express.Router();

let mySqlSelectAll = "SELECT * FROM messengerusers";
let mySqlDeleteByName = "DELETE * FROM messengerusers WHERE Username=?"

/* GET users listing. */
router.get('/', function(req, res, next) {
    if(req.cookies.username !== '123'){
        let usernames = [];
        let regdates = [];
        connection.query(mySqlSelectAll, function (err,result){
            //console.log(result);
        res.render('main.pug',{
           title: 'main',
            auth:req.cookies.username,
           dbData: result,
        });
    });}
    else {
        res.render('main.pug', { title: 'main'});
    }
    console.log("main load");
    //console.log(req.cookies);
});

router.post('/', function (res, req, next){
    console.log("FUCKING POST");
    console.log(res.body);
    console.log(req);
    if(req.body.op==="block"){
        connection.query(mySqlDeleteByName, req.body.name, function(err){
            if(err) console.log("del err")
            console.log(err);
        })
    }
});

module.exports = router;