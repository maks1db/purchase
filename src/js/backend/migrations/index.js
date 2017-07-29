const actualVersion = require('./version');
const list = require('./migration-list');
const dateToString = require('../../common/libs/dateToString');
let squel = require('squel');
const connector = require('../database/connector');
const db = new connector();

function migrate(version){
    return new Promise((resolve) => {
        if (parseInt(version) >= parseInt(actualVersion)){
            resolve();
            return;
        }
        next(parseInt(version) + 1, resolve);
    });
    
}

function next(version, resolve){
    let operations = list.find(x => x.version === version).operations;

    let q = '';
    operations.forEach(x => q += x + '; ');
    db.query(q)
    .then(() => {
        q = squel.insert()
        .into('migrations')
        .set('version', version)
        .set('date', dateToString(new Date(), 'dateTime', '-'))
        .toString();
        return db.query(q);
        
    })
    .then(() => {
        console.log(`Migration to version ${version} complete`);
        if (parseInt(version) + 1 > parseInt(actualVersion)){
            console.log('All migrations complete...');
            resolve();
        }
        else{
            next(parseInt(version) + 1, resolve);
        }
    });
}

module.exports = migrate;