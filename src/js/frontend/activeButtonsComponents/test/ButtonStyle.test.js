import React from 'react';
import { shallow, mount, render } from 'enzyme';
import ButtonStyle from '../ButtonStyle.jsx';
import {expect} from 'chai';


describe('components', () => {
    describe('ButtonStyle', () => {
        it('should render self with props', () => {
            const wrapper = shallow(<ButtonStyle top={10} bottom={11} left={12} right={14}/>);

            const style = wrapper.get(0).props.style;
            expect(style.top).to.eql('10px');
            expect(style.bottom).to.eql('11px');
            expect(style.left).to.eql('12px');
            expect(style.right).to.eql('14px');
        });
    });
});