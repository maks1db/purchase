import React from 'react';
import { shallow, mount, render } from 'enzyme';
import ButtonStyle from '../ButtonStyle.jsx';
import {expect} from 'chai';


describe.only('components', () => {
    describe('ButtonStyle', () => {
        it('should render self and subcomponents', () => {
            const wrapper = mount(<ButtonStyle top={10} bottom={11} left={12} right={14}/>);
            console.log(wrapper);
            const style = wrapper.get(0).props.style;
            expect(style.top).to.eql('10px');
            expect(style.bottom).to.eql('11px');
            expect(style.left).to.eql('12px');
            expect(style.right).to.eql('14px');
        });
    });
});