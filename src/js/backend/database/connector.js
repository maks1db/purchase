const config = require('../config');
const mysql = require('mysql');

let connectionMySQL;

class connector {
    constructor(){
        connectionMySQL = mysql.createConnection(config);
    }

    query(text){
        return new Promise((resolve, reject) => {
            connectionMySQL.query(typeof(text) === 'object' ? text.toString() : text, (err,res) => {
                if (err){
                    reject(err);
                }
                resolve(res);
            });     
        });     
    }

    close(){
        connectionMySQL.close();
    }
}

module.exports = connector;