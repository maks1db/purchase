const connector = require('./connector');
const db = new connector();
const createTable = require('./q/create-table');
const squel = require('squel');
const initTables = require('./init-tables');
const migrate = require('../migrations');

db.query(`CREATE DATABASE IF NOT EXISTS ${db.config().database}`)
.then(() => db.query(createTable('migrations', {version: 'VARCHAR(16)', date: 'DATETIME'})))
.then(() => {
    return db.query(squel.select()
        .from('migrations')
        .order('date', false));
}).then(res => {

    if (res.length === 0){
        let promises = [];
        initTables.forEach(x => promises.push(db.query(x)));
        
        return Promise.all(promises).then(() => {
            console.log('All tables create...');
            return '0';
        });        
    }
    else{
        return res[0].version;
    }
}).then((version) => {
    migrate(version);  
    db.close();
});



