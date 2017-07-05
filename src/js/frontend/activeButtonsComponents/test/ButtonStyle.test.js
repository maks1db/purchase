import React from 'react';
import { mount } from 'enzyme';
import ButtonStyle from '../ButtonStyle.jsx';
import {expect} from 'chai';

function setup() {
    const props = {
        top: 100,
        left: 50
    };

    const enzymeWrapper = mount(<ButtonStyle {...props} />);

    return {
        props,
        enzymeWrapper
    };
}

describe.only('components', () => {
    describe('ButtonStyle', () => {
        it('should render self and subcomponents', () => {
            
        });
    });
});