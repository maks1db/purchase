const express       = require('express');       
const app           = express();                 
const bodyParser    = require('body-parser');
const path          = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

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

app.get('*',function(req,res){
    res.sendFile(__dirname + '/index.html');
});
// app.use('/api/barcodes', new CRUD(models.barcodes).init('item'));
// app.use('/api/products', new CRUD(models.products).init('item'));
// app.use('/api/cashRegister', new CRUD(models.cashRegister).init('item'));
// app.use('/api/settings', new CRUD(models.settings).init('item'));
// app.use('/api', data1c);

app.listen(port, ()=> console.log('Server PURCHASE RUNNING on ' + port));

module.exports = app;