import reducer from '../stateMenu';
import {expect} from 'chai';
import constants from '../../constants';


describe('stateMenu()', () => {
    it('should return initial state', () => {
        expect(reducer(undefined,{})).to.eql(false);
    });
    it('should return state menu', () => {
        expect(reducer(false,{
            type: constants.TOGGLE_MENU,
            payload: true
        })).to.eql(false);
    });
});
