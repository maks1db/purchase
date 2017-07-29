import express from 'express';                      
import bodyParser from 'body-parser';
import path from 'path';
import CRUD from 'backend/CRUD-mysql';
import VK from 'backend/custom-api/vk';
import fill from 'backend/custom-api/fill';
import config from 'root/package.json';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Router, RouterContext, match } from 'react-router';
import routes from 'frontend/routes';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise';
import reducer from 'frontend/reducers';
import configureStore from 'frontend/store';

import {
    fetchComponentsData
} from './utils';

const app = express();  

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/',express.static(path.join(__dirname, '../../../public/favicon.ico')));
app.use('/assets',express.static(path.join(__dirname, '../../../public/assets')));

app.set('views', path.join(__dirname, '../backend/views'));
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


app.use((req, res) => {

    const store = configureStore();
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (redirectLocation) {
            res.redirect(301, redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
            res.send(500, error.message);
        } else if (!renderProps) {
            res.send(404, 'Not found');
        } else {
            fetchComponentsData(
                store.dispatch,
                renderProps.components,
                renderProps.params,
                renderProps.location.query
            )
            .then(() => {
                const componentHTML = ReactDOM.renderToString(
                    <Provider store={store}>+++++
                        <RoutingContext {...renderProps}/>
                    </Provider>
                );

                const initialState = store.getState();

                const metaData = getMetaDataFromState({
                    route  : renderProps.routes[renderProps.routes.length - 1].path,
                    state  : initialState
                });

                return renderHTML({
                    componentHTML,
                    initialState,
                    metaData,
                    config : clientConfig
                });
            })
            .then(html => {
                res.cookie('locale', locale, { maxAge: 900000 });
                res.end(html);
            })
            .catch(err => {
                console.log(err.stack);
                res.end(err.message);
            });
        }
    });
});

app.listen(port, ()=> console.log('Server PURCHASE RUNNING on ' + port));

module.exports = app;