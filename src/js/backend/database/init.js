const connector = require('./connector');
const db = new connector();
const createTable = require('./q/create-table');
const squel = require('squel');
const initTables = require('./init-tables');

db.query(createTable('migrations', {version: 'VARCHAR(16)', date: 'DATETIME'}))
.then(() => {
    return db.query(squel.select()
        .from('migrations')
        .order('date', false));
}).then(res => {

    if (res.length === 0){
        let promises = [];
        initTables.forEach(x => promises.push(db.query(x)));

        return Promise.all(promises).then(() => {
            return '1';
        });        
    }
    else{
        res[0].version;
    }
});



