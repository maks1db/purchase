import reducer from '../titleHref';
import {expect} from 'chai';
import constants from '../../constants';

describe('title()', () => {
    it('should return initial state', () => {
        expect(reducer(undefined,{})).to.eql({});
    });
    it('should return title href', () => {

        const obj = {
            href: 'href',
            albumHref: 'albumHref'
        };

        expect(reducer({},{
            type: constants.TITLE_HREF,
            payload: obj
        })).to.eql(obj);
    });
});
