let squel = require('squel');
const connector = require('../database/connector');
const camelcase = require('camelcase');
const snakecase = require('snake-case');
const dateToString = require('../../frontend/libs/dateToString');

function toMySqlString(opt, key, item){
    
    if (!opt) return item;
    if ('dateColumns' in opt){
        if (opt.dateColumns.indexOf(key) >= 0){            
            if (item === 0){
                return null;
            }
            return dateToString(new Date(item), 'dateTime', '-');
        }
    }
    return item;
}

class CRUD {

    constructor(table, options){
        this.table = table;
        this.options = options;
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

        const item = req.body;
        
        let q = squel.insert()
        .into(this.table);

        Object.keys(item).forEach(x => q.set(snakecase(x), 
            toMySqlString(this.options, x, item[x])));

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
            let sort = req.query.sort;
            const limit = req.query.limit || 0;

            if (get){
                get.forEach(x => q.where(x));
            }
            if (sort){
                sort = JSON.parse(sort);
                Object.keys(sort).forEach(x => {
                    q.order(snakecase(x), sort[x]);
                });
            }

            q.limit(limit);
        }

        db.query(q.toString())
        .then(result => {

            let csResult = result.map(x => {
                let obj = {};
                Object.keys(x).forEach(o => {
                    obj[camelcase(o)] = x[o];
                });
                return obj;
            });
            if (takeFirst){
                res.json(csResult.length > 0 ? csResult[0] : {});   
            }
            else{
                res.json(csResult);
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
        let items = req.body;
        Object.keys(items).forEach(x => q.set(snakecase(x), toMySqlString(this.options, x, items[x])));
        
        q.where(`id = ${id}`);

        db.query(q.toString())
        .then(result => {
            if ('onSaveQuery' in this.options){
                db.query(this.options.onSaveQuery(id, squel))
                .then(() => {
                    res.json({result: true});
                    db.close();
                });
            }
            else{
                res.json({result: result.changedRows === 1});
                db.close();
            }
            
        });
    }
}

module.exports = CRUD;