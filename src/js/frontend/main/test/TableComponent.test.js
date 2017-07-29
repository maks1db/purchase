import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Component from '../TableComponent.jsx';
import {expect} from 'chai';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const items = [{
    id: 123321,
    title: 'purchase',
    paid: true,
    office: 'Russia',
    planDate: new Date(2017,0,1),
    sum: 3000  
}];

describe('containers', () => {
    describe('Main container', () => {
        it('should render', () => {
            const wrapper = mount(
                <MuiThemeProvider>
                    <Component 
                        purchases={items}
                    />
                </MuiThemeProvider>
            );
            
        });
    });
});