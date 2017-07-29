import express from 'express';                      
import bodyParser from 'body-parser';
import path from 'path';
import CRUD from './src/js/backend/CRUD-mysql';
import VK from './src/js/backend/custom-api/vk';
import fill from './src/js/backend/custom-api/fill';
import config from './package.json';

// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import { Router, RouterContext, match } from 'react-router';
// import routes from './src/js/frontend/routes';
// import { applyMiddleware, createStore } from 'redux';
// import { Provider } from 'react-redux';
// import promiseMiddleware from 'redux-promise';
// import reducer from './src/js/frontend/reducers';

const app = express();  

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/',express.static(path.join(__dirname, 'public/favicon.ico')));
app.use('/assets',express.static(path.join(__dirname, 'public/assets')));

app.set('views', path.join(__dirname, 'src/js/backend/views'));
app.set('view engine', 'ejs');

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});

const port = 8000;

//app.use('/', (req))


app.use('/api/purchase', new CRUD('purchases',{
    dateColumns: ['date', 'planDate'],
    onSaveQuery: (id, q) => q.delete().from('products').where(`purchase_id = ${id}`),
    onDeleteQuery: (id, q) => q.delete().from('products').where(`purchase_id = ${id}`)
}).init('item'));
app.use('/api/product', new CRUD('products').init('item'));
app.use('/api/vk',      VK);
app.use('/api/fill',    fill);
app.get('*',function(req,res){
    //res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
    res.render('index.ejs', {version: config.version});
});

app.listen(port, ()=> console.log('Server PURCHASE RUNNING on ' + port));

module.exports = app;