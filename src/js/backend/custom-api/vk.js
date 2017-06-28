var express = require('express'),
    router = express.Router(),
    vk = require('../vk');

router.get('/user', (req, res) => {
    let VK = new vk();
    const query = req.body;
    const strings = query.user.split('/');
    const id = strings[strings.length - 1];

    VK.request('users.get', {user_ids: id, fields: 'photo_100'})
    .then(x => {
        var a= 1;
    });

});

module.exports = router;