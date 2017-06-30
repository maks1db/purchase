var express = require('express'),
    router = express.Router();
const connector = require('../database/connector');
let squel = require('squel');

router.get('/org', (req, res) => {
    
    const q = squel.select()
                .field('org')
                .from('purchases')
                .distinct()
                .order('org');
    
    const db = new connector();
    db.query(q.toString())
    .then(result => {
        res.json({id: result.insertId});
        db.close();
    });
});

router.get('/unit', (req, res) => {
    

});

router.get('/office', (req, res) => {
    

});


module.exports = router;