import reducer from '../rowState';
import {expect} from 'chai';
import constants from '../../constants';


describe('rowState()', () => {
    it('should return initial state', () => {
        const result = reducer(undefined,{});
        expect(result).to.be.a('array').eql([]);
    });
    it('should return row state', () => {
        expect(reducer(10,{
            type: constants.ROW_STATE,
            payload: [1]
        })).to.be.an('array').eql([1]);
    });
});
