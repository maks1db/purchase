import reducer from '../purchaseSum';
import {expect} from 'chai';
import constants from '../../constants';


describe('purchaseSum()', () => {
    it('should return initial state', () => {
        expect(reducer(undefined,{})).to.eql(0);
    });
    it('should return purchase sum', () => {
        expect(reducer(10,{
            type: constants.PURCHASE_SUM,
            payload: 5
        })).to.eql(5);
    });
});
