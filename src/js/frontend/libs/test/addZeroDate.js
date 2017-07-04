var lib = require('../addZeroDate');
var expect = require('chai').expect;

module.exports = 
describe('- addZeroDate', () => {
    it('test on take values lenght = 1', function() {

        const result = lib(1);
        expect(result).to.be.a('string')
        .have.lengthOf(2).eql('01');

    });
    it('test on take values lenght = 2', function() {

        const result = lib(15);
        expect(result).to.be.a('string')
        .have.length(2).eql('15');
        
    });
});