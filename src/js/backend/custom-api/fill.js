var express = require('express'),
    router = express.Router();
const connector = require('../database/connector');
let squel = require('squel');

router.get('/org', (req, res) => {
    
    const q = squel.select()
                .field('org')
                .from('purchases')
                .where('org <> ""')
                .distinct()
                .order('org');
    
    const db = new connector();
    db.query(q.toString())
    .then(result => {
        res.json(result.map(x=> x.org));
        db.close();
    });
});

router.get('/unit', (req, res) => {
    
    const q = squel.select()
                .field('unit')
                .from('products')
                .where('unit <> ""')
                .distinct()
                .order('unit');
    
    const db = new connector();
    db.query(q.toString())
    .then(result => {
        res.json(result.map(x=> x.unit));
        db.close();
    });
});

router.get('/office', (req, res) => {
    
    const q = squel.select()
                .field('office')
                .from('purchases')
                .where('office <> ""')
                .distinct()
                .order('office');
    
    const db = new connector();
    db.query(q.toString())
    .then(result => {
        res.json(result.map(x=> x.office));
        db.close();
    });
});


module.exports = router;