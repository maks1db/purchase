var express = require('express'),
    router = express.Router(),
    vk = require('../vk');

router.get('/user', (req, res) => {
    let VK = new vk();

    const strings = req.body.user.split('/');
    const id = strings[strings.length - 1];

    VK.setToken()
    .then(() => {
        return VK.request('users.get', {user_ids: id, fields: 'photo_100'});
    })
    .then((request) => {
        var a = 1;
    });

});

module.exports = router;