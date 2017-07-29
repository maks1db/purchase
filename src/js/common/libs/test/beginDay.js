var lib = require('../beginDay');
var expect = require('chai').expect;

module.exports = 
describe('- beginDay', () => {

    const date = new Date();
    const result = lib(date);

    it('check hours', function() {
        expect(result.getMinutes()).to.eql(0);
        expect(result.getSeconds()).to.eql(0);
        expect(result.getHours()).to.eql(0);
    });
    it('check date', function() {
        expect(result.getFullYear()).to.eql(date.getFullYear());
        expect(result.getMonth()).to.eql(date.getMonth());
        expect(result.getDate()).to.eql(date.getDate());
    });
});