import paperDepth from '../paperDepth';
import {expect} from 'chai';

describe.only('Reducers testing', () => {
    describe('paperDepth', () => {
        it('should return initial state', () => {
            expect(paperDepth()).to.eql(2);
        });
    });
});