import axios from 'axios';
import saveAs from 'file-saver';

const API_PREFIX = location.port === '8080' ? '' : 'http://localhost:8080';

const put = (collection, data) => {
    return axios.put(`${API_PREFIX}/api/${collection}/item`, data);
};

const update = (collection, id, data) => {
    return axios.post(`${API_PREFIX}/api/${collection}/item/${id}`, data);
};

const get = (collection, options = {}) => {

    let query = {},
        sort = {};
    if ('query' in options){
        query = options.query;
    }
    if ('sort' in options){
        sort = options.sort;
    }
    return axios.get(`${API_PREFIX}/api/${collection}/item/`, {
        params: {query, sort}
    });
};

const getItem = (collection, id) => {
    return axios.get(`${API_PREFIX}/api/${collection}/item/${id}`);  
};

const saveSettings = (items) => {
    return axios.post(`${API_PREFIX}/api/settings/`, items); 
};

const history = (begin, end) => {
    axios.post(`${API_PREFIX}/api/history/`, {
        begin, end
    }).then(() => {});
};

export default {
    put, 
    update, 
    get, 
    getItem,
    saveSettings,
    history
};