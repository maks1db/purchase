const app = require('../../../../app');
const request = require('supertest');
const assert = require('assert');

describe('Тестирование vkapi', () => {
    //id элемента

    it('Получение сведений о пользователе', (done) =>{

        request(app)
            .get('/api/vk/user')
            .send({user: 'https://vk.com/id9433922'})
            .expect((response) => {

                assert.deepEqual(response.body.id === Id, true);

            })
            .end(done);
    });
});


