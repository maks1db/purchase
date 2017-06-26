let squel = require('squel');
const connector = require('../database/connector');

class CRUD {

    constructor(table){
        this.table = table;
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

        const items = req.body;
        
        let q = squel.insert()
        .into(this.table);

        Object.keys(items).forEach(x => q.set(x, items[x]));

        const db = new connector();
        db.query(q.toString())
        .then(result => {
            res.json({id: result.insertId});
            db.close();
        });
    }

    get(req, res){
    
        const id = req.params.id;
        let q = squel.select()
        .from(this.table);
        const db = new connector();

        let takeFirst = false;
        if (id !== undefined){            
            q.where(`id = ${id}`);
            takeFirst = true;
        }
        else{

            const get = req.query.query;
            const sort = req.query.sort;
            const limit = req.query.limit || 0;

            if (get){
                JSON.parse(get).forEach(x => q.where(x));
            }
            if (sort){
                JSON.parse(sort).forEach(x => q.sort(x.key, x.value));
            }

            q.limit(limit);
        }

        db.query(q.toString())
        .then(result => {

            if (takeFirst){
                res.json(result.length > 0 ? result[0] : {});   
            }
            else{
                res.json(result);
            }
            
            db.close();
        });
    }

    delete(req, res){

        const db = new connector();
        const id = req.params.id;   
        let q = squel.delete()
        .from(this.table)
        .where(`id = ${id}`);

        db.query(q.toString())
        .then(result => {
            res.json({result: result.affectedRows === 1});
            db.close();
        });

    }

    post(req, res){

        const id = req.params.id;
        const db = new connector();

        let q = squel.update()
        .table(this.table);

        Object.keys(req.body).forEach(x => q.set(x, req.body[x]));
        
        q.where(`id = ${id}`);

        db.query(q.toString())
        .then(result => {
            res.json({result: result.changedRows === 1});
            db.close();
        });
    }
}

module.exports = CRUD;