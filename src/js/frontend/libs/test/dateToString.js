var lib = require('../dateToString');
var addZero = require('../addZeroDate');
var expect = require('chai').expect;

module.exports = 
describe('- dateToString', () => {

    it('check without delimiter', function() {

        const date = new Date();
        const result = lib(date);

        const split = result.split(' ');
        
        expect(result).to.be.a('string')
        .have.lengthOf(19);

        expect(split).to.be.an('array').
        that.is.not.empty;

        expect(split.length).to.eql(2);

        if (split.length !== 2){
            return;
        }

        const sDate = split[0].split('.');
        const hDate = split[1].split(':');

        expect(sDate[0]).to.eql(addZero(date.getDate()));
        expect(sDate[1]).to.eql(addZero(date.getMonth()+1));
        expect(sDate[2]).to.eql(date.getFullYear().toString());

        expect(hDate[0]).to.eql(addZero(date.getHours()));
        expect(hDate[1]).to.eql(addZero(date.getMinutes()));
        expect(hDate[2]).to.eql(addZero(date.getSeconds()));

    });
    it('check with delimiter "-"', function() {
        const date = new Date();
        const result = lib(date, 'dateTime', '-');

        const split = result.split(' ');
        
        expect(result).to.be.a('string')
        .have.lengthOf(19);

        expect(split).to.be.an('array').
        that.is.not.empty;

        expect(split.length).to.eql(2);

        if (split.length !== 2){
            return;
        }

        const sDate = split[0].split('-');
        const hDate = split[1].split(':');

        expect(sDate[2]).to.eql(addZero(date.getDate()));
        expect(sDate[1]).to.eql(addZero(date.getMonth()+1));
        expect(sDate[0]).to.eql(date.getFullYear().toString());

        expect(hDate[0]).to.eql(addZero(date.getHours()));
        expect(hDate[1]).to.eql(addZero(date.getMinutes()));
        expect(hDate[2]).to.eql(addZero(date.getSeconds())); 

    });
    it('check without delimiter only date', function() {

        const date = new Date();
        const result = lib(date, 'date');
        
        expect(result).to.be.a('string')
        .have.lengthOf(10);

        const sDate = result.split('.');

        expect(sDate[0]).to.eql(addZero(date.getDate()));
        expect(sDate[1]).to.eql(addZero(date.getMonth()+1));
        expect(sDate[2]).to.eql(date.getFullYear().toString());

    });
    it('check with delimiter "-" only date', function() {

        const date = new Date();
        const result = lib(date, 'date', '-');
        
        expect(result).to.be.a('string')
        .have.lengthOf(10);

        const sDate = result.split('-');

        expect(sDate[2]).to.eql(addZero(date.getDate()));
        expect(sDate[1]).to.eql(addZero(date.getMonth()+1));
        expect(sDate[0]).to.eql(date.getFullYear().toString());

    });
    it('check time', function() {

        const date = new Date();
        const result = lib(date, 'time');
        
        expect(result).to.be.a('string')
        .have.lengthOf(8);

        const hDate = result.split(':');

        expect(hDate[0]).to.eql(addZero(date.getHours()));
        expect(hDate[1]).to.eql(addZero(date.getMinutes()));
        expect(hDate[2]).to.eql(addZero(date.getSeconds()));

    });
});