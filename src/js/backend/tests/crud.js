const app = require('../../../../app');
const request = require('supertest');
const assert = require('assert');

const items = [
    {name: 'purchase', route: 'item', dataInit: {title:'test'}, dataChange:{title:'test1'}},
];

items.forEach(x => {
    const route = `/api/${x.name}/${x.route}/`;
    describe(`CRUD тестирование ${route}`, () => {
        //id элемента
        let Id = 0;

        it('Создание нового элемента', (done) =>{

            request(app)
                .put(route).
                send(x.dataInit)
                .expect((response) => {
                    Id = parseInt(response.body.id);
                    assert.deepEqual(typeof(response.body.id), 'number');
                })
                .end(done);
        });

        it('Чтение текущего элемента', (done) =>{

            request(app)
                .get(route + Id)
                .expect((response) => {

                    assert.deepEqual(response.body.id === Id, true);

                })
                .end(done);
        });

        it('Чтение всех элементов', (done) =>{

            request(app)
                .get(route)
                .expect((response) => {

                    assert.deepEqual(response.body.length > 0, true);

                })
                .end(done);
        });

        it('Изменение текущего элемента', (done) =>{

            request(app)
                .post(route + Id).
                send(x.dataChange)
                .expect((response) => {
                    assert.deepEqual(response.body.result, true);
                })
                .end(done);
        });

        it('Удаление созданного элемента', (done) =>{

            request(app)
                .delete(route + Id)
                .expect((response) => {

                    assert.deepEqual(response.body.result, true);

                })
                .end(done);
        });
    });
});

