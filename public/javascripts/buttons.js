document.getElementById("blockbutton").onclick = blockbtn;
document.getElementById("unblockbutton").onclick = unblockbtn;
document.getElementById("deletebutton").onclick = deletebtn;

let checkboxesNum = document.getElementsByClassName("checkbox").length;
const mySql = require("mysql2");
const connection = mySql.createConnection({
    host: "localhost",
    user: "root",
    database: "node_db",
    password: ""
})
connection.connect(function(err){
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else{
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});
let mySqlSelectAll = "DELETE * FROM messengerusers WHERE ID=?";
let req = new XMLHttpRequest();

function blockbtn(){
    let len = document.getElementsByClassName("checkbox").length;
    alert(len);

    for(let num = 1; num <= len; num++){
        console.log("checkbox"+num);
        if(document.getElementById("checkbox"+num).checked){
            console.log("IF");
            connection.query(mySqlSelectAll, num, function (err, res){
                let reqBody = "op='block'; name=" + document.getElementById("user"+num).getAttribute(name);
                req.open('POST', '/submit', true);
                req.setRequestHeader('Content-type', 'application/x-form-urlencoded');
               req.send(reqBody);
               console.log(req);
            });
        }
    }
    alert("blockbtn");
}