import {expect} from 'chai';
import constants from '../../constants';
import {setSum, 
        titleHref,
        setPaperDepth,
        setTitle,
        setRowState,
        toggleMenu} from '..';

describe('Test actions', () => {
    describe('setSum(payload)', () => {
        it('should create action', function() {
            const action = setSum(10);

            expect(action).to.eql({
                type: constants.PURCHASE_SUM,
                payload: 10
            });
        });
    });  
    describe('titleHref(href, albumHref)', () => {
        it('should create action', function() {

            const href = '123';
            const albumHref = '321';
            const action = titleHref(href, albumHref);

            expect(action).to.eql({
                type: constants.TITLE_HREF,
                payload: {
                    href,
                    albumHref
                }
            });
        });
    });
    describe('setPaperDepth(payload)', () => {
        it('should create action', function() {
            const action = setPaperDepth(10);

            expect(action).to.eql({
                type: constants.MAIN_PAPER_DEPTH,
                payload: 10
            });
        });
    });
    describe('setTitle(payload)', () => {
        it('should create action', function() {
            const action = setTitle(10);

            expect(action).to.eql({
                type: constants.CHANGE_TITLE,
                payload: 10
            });
        });
    });
    describe('setRowState(payload)', () => {
        it('should create action', function() {
            const action = setRowState(10);

            expect(action).to.eql({
                type: constants.ROW_STATE,
                payload: 10
            });
        });
    });
    describe('toggleMenu(payload)', () => {
        it('should create action', function() {
            const action = toggleMenu(true);

            expect(action).to.eql({
                type: constants.TOGGLE_MENU,
                payload: true
            });
        });
    });
});
