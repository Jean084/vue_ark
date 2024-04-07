const connectionCrate = require("../config/db");
const connection = connectionCrate.connection
connection.connect(function(err) {
    if (err) {
        console.log('Error connecting to Database', err);
        return;
    }
    console.log("Connected!");
})
function querydb(sql,callback) {
        connection.query(sql, (err, results,fieldss) => {
            if (err) {
                callback("500")
            }
            else{
                callback(results)}
        })
        //connection.end();
}
function insterdb(sql,params,callback) {
    connection.query(sql, params,(err, fieldss) => {
        if (err) {
            callback("500")
        }
        else{callback("200")}
    })
    //connection.end();
}
function updatedb(sql,callback) {
    connection.query(sql, (err, fieldss) => {
        if (err) {
            callback("500")
            //throw err
        }
        else{callback("200")}
    })
    //connection.end();
}
module.exports = {
    querydb,insterdb,updatedb
}