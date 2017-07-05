import paperDepth from '../paperDepth';
import {expect} from 'chai';
import constants from '../../constants';


describe('paperDepth()', () => {
    it('should return initial state', () => {
        expect(paperDepth(undefined,{})).to.eql(2);
    });
    it('should return paper depth', () => {
        expect(paperDepth(10,{
            type: constants.MAIN_PAPER_DEPTH,
            payload: 5
        })).to.eql(5);
    });
});
