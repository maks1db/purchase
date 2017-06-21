const createTable = require('./q/create-table');
module.exports = [
    createTable('purchases',{
        title: 'VARCHAR(200)',
        href: 'TEXT',
        album_href: 'TEXT',
        org: 'VARCHAR(200)',
        org_href: 'TEXT',
        cost: 'DECIMAL',
        paid: 'BOOLEAN',
        office: 'VARCHAR(200)',
        date: 'DATETIME',
        plan_date: 'DATETIME',
        email: 'VARCHAR(200)' 
    }),
    createTable('products',{
        title: 'VARCHAR(200)',
        purchase_id: 'INT'
    })
];