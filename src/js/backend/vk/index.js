const config = require('../config/config.dev.json');
const VK = require('vksdk');


class VkClass {
    constructor(){
        this.vk = new VK({
            'appId'     : parseInt(config.vk.id),
            'appSecret' : config.vk.secret,
            secure: true,
            https: true
        });

        // Setup server access token for server API methods
        this.vk.on('serverTokenReady', function(_o) {
            // Here will be server access token
            this.vk.setToken(_o.access_token);
        });

        // Turn on requests with access tokens
        this.vk.setSecureRequests(true);
    }

    request(option){
        return new Promise((resolve) => {
            this.vk.request(option.name, option.params || {}, function(res) {
                resolve(res);
            });
        });     
    }
}

module.exports = VkClass;