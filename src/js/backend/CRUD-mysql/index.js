var squel = require('squel');
class CRUD {

    constructor(table){
        this.model = table;
    }

    init(name){
        var express = require('express'),
            router = express.Router();

        //создание
        router.put(`/${name}`, (req, res) => this.put(req, res));

        //выборка объекта/объектов
        router.get(`/${name}/(:id)?`, (req, res) => this.get(req, res));

        //обновление объекта
        router.post(`/${name}/:id`, (req, res) => this.post(req, res));

        //удаление объекта
        router.delete(`/${name}/:id`, (req, res) => this.delete(req, res));
        
        return router;
    }

    put(req, res){

        const item = new this.model(req.body);
        if ('put' in this.options){
            req.body = this.options.put(req.body);
        }
        item.save().then((doc) => {
            res.json({
                result: true,
                id: doc._id.toString()
            });
        });
    }

    get(req, res){
    
        const id = req.params.id;

        if (id !== undefined){
            
            this.model.findById(id).then((obj) => {           
                res.json(obj);
            });
        }
        else{

            const get =  req.query.query;
            const sort = req.query.sort;
            const limit = req.query.limit || 0;

            this.model.find(JSON.parse(get)).sort(JSON.parse(sort)).limit(parseInt(limit)).then((data) => {

                let arr = [];
                data.forEach(x => arr.push(x._doc));
                res.json(arr);
                
            });
        }
    }

    delete(req, res){

        const id = req.params.id;   

        this.model.remove({_id: ObjectID(id)}).then((data) =>{
            res.json({
                result: data.result.ok === 1
            });       
        });

    }

    post(req, res){
        const id = ObjectID(req.params.id);

        this.model.update({_id: id}, req.body).then((data) => {
            res.json({result: data.nModified === 1});
        });
    }
}

module.exports = CRUD;