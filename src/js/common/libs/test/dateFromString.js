var lib = require('../dateFromString');
var expect = require('chai').expect;

module.exports = 
describe('- dateFromString', () => {

    const date = '01.01.2017 23:09:00';
    const result = lib(date);

    it('check hours', function() {
        expect(result.getMinutes()).to.eql(9);
        expect(result.getSeconds()).to.eql(0);
        expect(result.getHours()).to.eql(23);
    });
    it('check date', function() {
        expect(result.getFullYear()).to.eql(2017);
        expect(result.getMonth()).to.eql(0);
        expect(result.getDate()).to.eql(1);
    });
});