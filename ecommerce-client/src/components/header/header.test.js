import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { findElementByAtrr } from './../../utils';
import Header from './index';

describe('Header Component', () => {
    let shallowWrapper;
    configure({ adapter: new Adapter() });
    beforeEach((props={}) => {
        shallowWrapper = shallow(<Header {...props} />);
    });

    it('Should render without errors', () => {
        const wrapper = findElementByAtrr(shallowWrapper, 'headerComponent');
        expect(wrapper.length).toBe(1);
    });
});