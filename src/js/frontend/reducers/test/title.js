import reducer from '../title';
import {expect} from 'chai';
import constants from '../../constants';


describe('title()', () => {
    it('should return initial state', () => {
        expect(reducer(undefined,{})).to.eql('Главная страница');
    });
    it('should return title', () => {
        expect(reducer('Title',{
            type: constants.CHANGE_TITLE,
            payload: 'New title'
        })).to.eql('New title');
    });
});
