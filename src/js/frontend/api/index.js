import axios from 'axios';

const API_PREFIX = location.port === '8000' ? '' : 'http://localhost:8000';

const put = (collection, data) => {
    return axios.put(`${API_PREFIX}/api/${collection}/item`, data);
};

const update = (collection, id, data) => {
    return axios.post(`${API_PREFIX}/api/${collection}/item/${id}`, data);
};

const get = (collection, options = {}) => {

    let query = [],
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

export default {
    put, 
    update, 
    get, 
    getItem
};