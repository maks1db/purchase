var express = require('express'),
    router = express.Router(),
    vk = require('../vk');

router.get('/user', (req, res) => {
    let VK = new vk();

    const strings = req.query.user.split('/');
    if (strings.length < 3){
        return res.json({});
    }

    const id = strings[strings.length - 1];

    VK.request('users.get', {user_ids: id, fields: 'photo_100'})
    .then(response => {
        res.json(response.length > 0 ? response[0] : {});
    });

});

module.exports = router;