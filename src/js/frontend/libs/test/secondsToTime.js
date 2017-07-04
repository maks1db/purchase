var lib = require('../secondsToTime');
var expect = require('chai').expect;

module.exports = 
describe('- secondsToTime', () => {

    it('check not empty result', function() {

        const result = lib(50);
        expect(result).to.be.a('string').not.empty;

    });
    it('check values', function() {
        
        expect(lib(50)).to.eql('00:50');
        expect(lib(0)).to.eql('00:00');
        expect(lib(120)).to.eql('02:00');
        expect(lib(123)).to.eql('02:03');
        expect(lib(307)).to.eql('05:07');
        expect(lib(3610)).to.eql('60:10');
        expect(lib(7266)).to.eql('121:06');

    });
});