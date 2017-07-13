const express       = require('express');       
const app           = express();                 
const bodyParser    = require('body-parser');
const path          = require('path');
const CRUD          = require('./src/js/backend/CRUD-mysql');
const VK            = require('./src/js/backend/custom-api/vk');
const fill          = require('./src/js/backend/custom-api/fill');
const config        = require('./package.json');

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