const mysql = require("mysql");

var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"121344",
    port:3306,
    database:"arknights"
})

module.exports.connection = connection;