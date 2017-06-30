const config = require('../config');
const mysql = require('mysql');

let connectionMySQL = mysql.createConnection(
    {
        user: config.mysql.user,
        password: config.mysql.password,
        host: config.mysql.host 
    }
);
connectionMySQL.query(`CREATE DATABASE ${config.mysql.database}`, (err,res) => {
    if (err){
        console.log(err);
        return;
    }
    console.log('Operation success');
});





