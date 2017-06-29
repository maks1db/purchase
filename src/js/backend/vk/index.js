const config = require('../config/');
const VK = require('vk-io');


class VkClass {
    constructor(){
        this.vk = new VK({
            'app' : config.vk.id,
            'key' : config.vk.secret
        });
        
    }

    setToken(){
        return this.vk.auth.server()
        .then((token) => {
            this.vk.setToken(token);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    request(method, options){
        return this.vk.api.call(method, options || {});
            
    }
}

module.exports = VkClass;