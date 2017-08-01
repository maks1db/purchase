import express                      from 'express';                      
import bodyParser                   from 'body-parser';
import path                         from 'path';
import CRUD                         from 'backend/CRUD-mysql';
import VK                           from 'backend/custom-api/vk';
import fill                         from 'backend/custom-api/fill';
import config                       from 'root/package.json';

import React                        from 'react';
import ReactDOM                     from 'react-dom/server';
import { Provider }                 from 'react-redux';
import { RoutingContext, match }    from 'react-router';
import reducer                      from 'frontend/reducers';
import configureStore               from 'frontend/store';
import routes                       from 'frontend/routes.jsx';
import fetchComponentsData          from './utils/fetchComponentsData';
import MuiThemeProvider             from 'material-ui/styles/MuiThemeProvider';

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
    res.render('index.ejs', {
        version: config.version,
        contentHTML:'', 
        initialState: JSON.stringify({})
    });
});


// app.use((req, res) => {

//     const store = configureStore();
    
//     match({ routes: routes, location: req.url }, (error, redirectLocation, renderProps) => {
//         if (redirectLocation) {
//             res.redirect(301, redirectLocation.pathname + redirectLocation.search);
//         } else if (error) {
//             res.send(500, error.message);
//         } else if (!renderProps) {
//             res.send(404, 'Not found');
//         } else {
//             fetchComponentsData(
//                 store.dispatch,
//                 renderProps.components,
//                 renderProps.params,
//                 renderProps.location.query
//             )
//             .then(() => {
//                 const contentHTML = ReactDOM.renderToString(
//                     <Provider store={store}>
//                         <MuiThemeProvider> 
//                             <RoutingContext {...renderProps}/>
//                         </MuiThemeProvider>
//                     </Provider>
//                 );

//                 const initialState = store.getState();

//                 res.render('index.ejs', {
//                     version: config.version, 
//                     contentHTML,
//                     initialState    
//                 });
//             })
//             .catch(err => {
//                 console.log(err.stack);
//                 res.end(err.message);
//             });
//         }
//     });
// });

app.listen(port, ()=> console.log('Server PURCHASE RUNNING on ' + port));

module.exports = app;